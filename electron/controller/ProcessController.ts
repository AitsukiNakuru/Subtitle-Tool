import {resolve} from "path";

const {ipcMain} = require('electron')
const parser = require('osu-parser')
const fs = require('fs')
const S = require('string');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const Kuroshiro = require('kuroshiro').default;
const path = require('path')
const time = require('timestamps');
const { parse, stringify, compile, decompile } = require('ass-compiler');
const XLSX = require("xlsx");

// 文本处理
const handleLyric = async (lyricPath) => {
  // 文件预处理
  let originalLyric = fs.readFileSync(lyricPath, 'utf8')
  let rule = getRule()



  let linesTxt = S(originalLyric).lines()
  const kuroshiro = new Kuroshiro();
  await kuroshiro.init(new KuromojiAnalyzer());

  // 定义return变量
  let segmentLyric = []
  let okuriganaLyric = []


  // 拆分
  for (const linesTxtKey in linesTxt) {
    let segmentStr = ''
    let okuriganaStr = ''
    let flag = 'word'
    // 拆分文字和标点
    for (let i = 0; i < linesTxt[linesTxtKey].length; i++) {
      let element = linesTxt[linesTxtKey][i]
      let nextElement = linesTxt[linesTxtKey][i+1]
      if (i === 0) {
        if (Kuroshiro.Util.isJapanese(element)) {
          flag = 'word'
        } else {
          flag = 'char1'
        }
        segmentStr = segmentStr.concat(element)
      } else if (Kuroshiro.Util.isJapanese(element)) {
        if (flag === 'char1') {
          segmentStr = segmentStr.concat(element)
        } else {
          segmentStr = segmentStr.concat('|', element)
        }
        flag = 'word'
      } else {
        segmentStr = segmentStr.concat(element)
        flag = 'char'
      }

    }

    // 合并双字
    for (let item of rule) {
      //console.log(item)
      segmentStr = S(segmentStr).replaceAll(item.original, item.converted).s;
    }


    segmentLyric.push(segmentStr)
    okuriganaStr = await kuroshiro.convert(segmentStr, {mode: 'okurigana'})
    okuriganaLyric.push(okuriganaStr)
  }

  return {
    lyricPath,
    originalLyric,
    segmentLyric,
    okuriganaLyric,
  }
}

// ass构造函数
const assFrameworkConstructor = (assJsonExample) => {
  return JSON.parse(JSON.stringify(assJsonExample.framework))
}
const assDialogueConstructor = (assJsonExample) => {
  return JSON.parse(JSON.stringify(assJsonExample.dialogue))
}
const assFragmentConstructor = (assJsonExample, inputKf, inputText) => {
  let fragment = JSON.parse(JSON.stringify(assJsonExample.fragment))
  fragment.tag = {
    kf: inputKf
  }
  fragment.text = inputText
  return fragment
}
const assStyleConstructor = (assJsonExample) => {
  return JSON.parse(JSON.stringify(assJsonExample.style))
}

// txt转ass
const convertTxtToOsu = async (editedLyricData, osuPath, assPath) => {
  // 读取AssJsonExample
  let assJsonExample = JSON.parse(fs.readFileSync(path.resolve("config", 'AssJsonExample.json'), 'utf8'));

  let assFramework = assFrameworkConstructor(assJsonExample)
  let assStyle = assStyleConstructor(assJsonExample)

  // 读取.osu
  let beatmap = parser.parseContent(fs.readFileSync(osuPath))

  // 解构txt
  let {segmentLyric, segmentLyricLengthArray} = editedLyricData

  // 开始转换
  let i = -1 // 用于遍历sentence
  let j = 0 // 用于遍历sentence中的每一个word
  let nowTime
  let dialogue
  let segmentStr = [] // 用于存放当前sentence
  let flag = true

  // 遍历beatmap中的每一个object
  for (const hitObject of beatmap.hitObjects)
  {
    // 将hitObjectTime转换为assTime
    // let convertedStartTime = time.ass(hitObject.startTime)
    // let convertedEndTime = time.ass(hitObject.endTime)
    let intervalTime = (hitObject.startTime - nowTime) / 10
    //console.log('intervalTime------' + typeof intervalTime)

    // 将hitObjectTime转换为assJsonTime
    let convertedStartTime = hitObject.startTime.toFixed(2)/1000
    //console.log('convertedStartTime------' + typeof convertedStartTime)

    // 不做转换
    //let convertedStartTime = hitObject.endTime

    // 如果是一组combo中的第一个hitObject
    if (hitObject.newCombo === true) {
      // 进入下一个sentence，并将sentence拆分存放到segmentStr中
      i = i + 1
      segmentStr = segmentLyric[i].split('|')

      // 初始化dialogue
      dialogue = assDialogueConstructor(assJsonExample)


      // 设置dialogue的startTime
      dialogue.start = convertedStartTime

      // 更新当前时间为hitObject的startTime
      nowTime = hitObject.startTime
      flag = true
    }

    // 如果是一组combo中的最后一个hitObject
    else if (j === segmentLyricLengthArray[i] - 2) {
      console.log(hitObject.startTime)
      if (!flag) continue
      // 设置dialogue的endTime
      dialogue.end = convertedStartTime

      // 创建一个fragment，并将fragment加入当前的dialogue中
      let fragment = assFragmentConstructor(assJsonExample, intervalTime, segmentStr[j])
      dialogue.slices[0].fragments.push(fragment)

      // 将当前dialogue加入framework
      assFramework.dialogues.push(dialogue)

      // 重置j，下一次遍历sentence时从第一个word开始
      j = 0

      // 将flag设置为false，直到遇到下一组combo时才会继续处理下一个sentence
      flag = false
    }

    // 如果是一组combo中间的hitObject
    else {
      if (!flag) continue
      // 创建一个fragment，并将fragment加入当前的dialogue中
      let fragment = assFragmentConstructor(assJsonExample, intervalTime, segmentStr[j])
      j = j + 1
      dialogue.slices[0].fragments.push(fragment)
      nowTime = hitObject.startTime
    }

  }

  //console.log(dialogue)
  // 转换完成，输出ass
  let compiledASS = decompile(assFramework)
  console.log(compiledASS)
  let assData = new Buffer(compiledASS)
  fs.writeFile(assPath, assData, 'utf8', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  })
}


ipcMain.handle('on-load-lyric-file-event', (e, args) => {
  console.log("ipcMain on-load-lyric-event")
  return handleLyric(args)

})
ipcMain.handle('on-load-osu-file-event', (e, args) => {
  console.log("ipcMain on-load-osu-event")
  let content = fs.readFileSync(args)
  let beatmap = parser.parseContent(content)
  let i = -1
  let j = 0
  let nowTime = 0
  let first = true
  let timeLineArray = []
  let timeLineItem1 = {
    startTime: 0,
    endTime: 0,
    objectCount: 0
  }
  let timeLineItem = {
    startTime: 0,
    endTime: 0,
    objectCount: 0
  }

  // 遍历beatmap中的每一个object
  for (const hitObject of beatmap.hitObjects) {

    // 将hitObjectTime转换为assTime
    let convertedStartTime = time.ass(hitObject.startTime)


    // 如果是一组combo中的第一个hitObject
    if (hitObject.newCombo === true) {
      if (first === true) {
        first = false
      } else {
        timeLineItem.endTime = nowTime
        timeLineArray.push(timeLineItem)
      }
      nowTime = convertedStartTime
      timeLineItem = JSON.parse(JSON.stringify(timeLineItem1))
      timeLineItem.startTime = convertedStartTime
    }
    nowTime = convertedStartTime
    timeLineItem.objectCount++
  }
  timeLineItem.endTime = nowTime
  timeLineArray.push(timeLineItem)
  return {
    beatmap,
    timeLineArray
  }
})
ipcMain.handle('on-load-all-file-event', (e, args) => {
  console.log("ipcMain on-load-all-file-event")
  console.log(args)
})

ipcMain.handle('on-save-ass-file-event', (e, args) => {
  console.log("ipcMain on-process-ass-event")
})

function getRule() {
  let filePath = resolve("config", "rule.xlsx");
  let workbook = XLSX.readFile(filePath, {type: "file"});
  let json = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1, {header: ["original", "converted"]});
  json.splice(0, 1)
  return json
}

ipcMain.handle('on-modify-ruler-ja-event', (e, args) => {
  console.log("ipcMain on-modify-ruler-ja-event")
  return getRule();
})

ipcMain.handle('on-generate-ass-file-event', (e, editedLyricData, osuPath, assPath) => {
  console.log("ipcMain on-generate-ass-file-event")
  console.log(editedLyricData, osuPath, assPath)
  let result = convertTxtToOsu(JSON.parse(editedLyricData), osuPath, assPath)
})
