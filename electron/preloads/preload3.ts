const { contextBridge, ipcRenderer } = require('electron');
const test3 = async () => {
  return await ipcRenderer.invoke('on-test-event')
}
export default {test3}
