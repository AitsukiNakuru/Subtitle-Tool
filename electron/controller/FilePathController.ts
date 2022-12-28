const {ipcMain, dialog} = require('electron')

ipcMain.handle('on-select-lyric-path-event', (e, msg) => {
  console.log("ipcMain  on-select-lyric-path-event")

  let result = dialog.showOpenDialog({
    title: 'Select lyric path',
    filters: [
      { name: 'txt file', extensions: ['txt']}
    ]
  })
  return result.then(res => {
    return res
  }, err => {
    return 'Select lyric path error'
  })
})

ipcMain.handle('on-select-osu-path-event', (e, msg) => {
  console.log("ipcMain  on-select-osu-path-event")

  let result = dialog.showOpenDialog({
    title: 'Select osu path',
    filters: [
      { name: 'osu file', extensions: ['osu']}
    ]
  })
  return result.then(res => {
    return res
  }, err => {
    return 'Select osu path error'
  })
})

ipcMain.handle('on-select-ass-path-event', (e, msg) => {
  console.log("ipcMain  on-select-ass-path-event")

  let result = dialog.showSaveDialog({
    title: 'Select ass path',
    filters: [
      { name: 'ass file', extensions: ['ass']}
    ]
  })
  return result.then(res => {
    console.log(res)
    return res
  }, err => {
    return 'Select ass path error'
  })
})
export {}
