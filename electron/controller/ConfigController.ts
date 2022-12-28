const {ipcMain} = require('electron')
const JsonTool = require('@aitsuki_nakuru/json-tool')
const path = require('path')
let configPath = path.resolve("config", "config.json")
ipcMain.handle('on-open-config-event', (e, args) => {
  console.log("ipcMain on-open-config-event")
  let config = new JsonTool(configPath)
  return config
})
ipcMain.handle('on-modify-config-event', (e, args) => {
  console.log("ipcMain on-modify-config-event")
})
