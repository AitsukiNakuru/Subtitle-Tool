const { contextBridge, ipcRenderer } = require('electron');
const test1 = async () => {
  return await ipcRenderer.invoke('on-test-event')
}
export default {test1}
