const {ipcMain} = require('electron')
const parser = require('osu-parser')
const fs = require('fs')
const S = require('string');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const Kuroshiro = require('kuroshiro').default;
const txtToJSON = require("txt-file-to-json");
const path = require('path')
const time = require('timestamps');
const { parse, stringify, compile, decompile } = require('ass-compiler');

ipcMain.handle('on-process-lyric-file-event', (e, args) => {
  console.log("ipcMain  on-process-lyric-event")
})
ipcMain.handle('on-process-osu-file-event', (e, args) => {
  console.log("ipcMain  on-process-osu-event")
  let content = fs.readFileSync(args)
  let beatmap = parser.parseContent(content)
  let i = -1
  let j = 0
  let nowTime = 0
  let first = true
  let timeLineArray = []
  let TimeLineItem = {
    startTime: 0,
    endTime: 0,
    objectCount: 0
  }
  let timeLineItem

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
      timeLineItem = JSON.parse(JSON.stringify(TimeLineItem))
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
ipcMain.handle('on-save-ass-file-event', (e, args) => {
  console.log("ipcMain on-process-ass-event")
})
