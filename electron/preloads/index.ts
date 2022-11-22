// const test1 = require("./preload1")
// const test2 = require("./preload2")
// const test3 = require("./preload3")
// const {contextBridge} = require('electron');
// contextBridge.exposeInMainWorld('testApi', {test1, test2, test3,})
const { contextBridge, ipcRenderer } = require('electron');
const test1 = async () => {
  return await ipcRenderer.invoke('on-test-event')
}
const test2 = async () => {
  return await ipcRenderer.invoke('on-test-event')
}
const test3 = async () => {
  return await ipcRenderer.invoke('on-test-event')
}
contextBridge.exposeInMainWorld('testApi', {test1, test2, test3})
export {}
