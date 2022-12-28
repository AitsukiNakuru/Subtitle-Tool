import {dialog} from "electron";
const fs = require('fs')
const path = require('path')
const {ipcMain} = require('electron')

ipcMain.handle('on-test-event', (e, msg) => {
  console.log("ipcMain  on-test-event")
  return {
    path: __dirname
  }
})
export {}
