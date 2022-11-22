const { contextBridge, ipcRenderer } = require('electron');
const test2 = async () => {
  return await ipcRenderer.invoke('on-test-event')
}
export default {test2}
