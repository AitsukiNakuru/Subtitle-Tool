//
// function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
//   return new Promise(resolve => {
//     if (condition.includes(document.readyState)) {
//       resolve(true)
//     } else {
//       document.addEventListener('readystatechange', () => {
//         if (condition.includes(document.readyState)) {
//           resolve(true)
//         }
//       })
//     }
//   })
// }
//
// const safeDOM = {
//   append(parent: HTMLElement, child: HTMLElement) {
//     if (!Array.from(parent.children).find(e => e === child)) {
//       return parent.appendChild(child)
//     }
//   },
//   remove(parent: HTMLElement, child: HTMLElement) {
//     if (Array.from(parent.children).find(e => e === child)) {
//       return parent.removeChild(child)
//     }
//   },
// }
//
// /**
//  * https://tobiasahlin.com/spinkit
//  * https://connoratherton.com/loaders
//  * https://projects.lukehaas.me/css-loaders
//  * https://matejkustec.github.io/SpinThatShit
//  */
// function useLoading() {
//   const className = `loaders-css__square-spin`
//   const styleContent = `
// @keyframes square-spin {
//   25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
//   50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
//   75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
//   100% { transform: perspective(100px) rotateX(0) rotateY(0); }
// }
// .${className} > div {
//   animation-fill-mode: both;
//   width: 50px;
//   height: 50px;
//   background: #fff;
//   animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
// }
// .app-loading-wrap {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: #282c34;
//   z-index: 9;
// }
//     `
//   const oStyle = document.createElement('style')
//   const oDiv = document.createElement('div')
//
//   oStyle.id = 'app-loading-style'
//   oStyle.innerHTML = styleContent
//   oDiv.className = 'app-loading-wrap'
//   oDiv.innerHTML = `<div class="${className}"><div></div></div>`
//
//   return {
//     appendLoading() {
//       safeDOM.append(document.head, oStyle)
//       safeDOM.append(document.body, oDiv)
//     },
//     removeLoading() {
//       safeDOM.remove(document.head, oStyle)
//       safeDOM.remove(document.body, oDiv)
//     },
//   }
// }
//
// // ----------------------------------------------------------------------
//
// const { appendLoading, removeLoading } = useLoading()
// domReady().then(appendLoading)
//
// window.onmessage = ev => {
//   ev.data.payload === 'removeLoading' && removeLoading()
// }
//
// setTimeout(removeLoading, 4999)

const { contextBridge, ipcRenderer } = require('electron');

const test =  () => {
  console.log("ipcRenderer  test")
  return ipcRenderer.invoke('on-test-event')
}

// Select file path
const selectLyricPath = async () => {
  console.log("ipcRenderer selectLyricPath")
  return await ipcRenderer.invoke('on-select-lyric-path-event')
}
const selectOsuPath = async () => {
  console.log("ipcRenderer selectOsuPath")
  return await ipcRenderer.invoke('on-select-osu-path-event')
}
const selectAssPath = async () => {
  console.log("ipcRenderer selectAssPath")
  return await ipcRenderer.invoke('on-select-ass-path-event')
}

// Process file
const processLyricFile = async (lyricPath: String) => {
  console.log("ipcRenderer processLyricFile")
  return ipcRenderer.invoke('on-process-lyric-file-event', lyricPath)
}
const processOsuFile = async (osuPath: String) => {
  console.log("ipcRenderer processOsuFile")
  return ipcRenderer.invoke('on-process-osu-file-event', osuPath)
}
const processAssFile = async (assPath: String) => {
  console.log("ipcRenderer processAssFile")
  return ipcRenderer.invoke('on-save-ass-file-event', assPath)
}
//const autoLoadOsuFile = (callback) => ipcRenderer.on('rendererMsg', callback)
// Load file
const loadLyricFile = async (lyricPath: String) => {
  console.log("ipcRenderer loadLyricFile" + lyricPath)
  return ipcRenderer.invoke('on-load-lyric-file-event', lyricPath)
}
const loadOsuFile = async (osuPath: String) => {
  console.log("ipcRenderer loadOsuFile"+ osuPath)
  return ipcRenderer.invoke('on-load-osu-file-event', osuPath)
}
const loadAllFile = async (...args) => {
  console.log("ipcRenderer loadAllFile", args)
  return ipcRenderer.invoke('on-load-all-file-event', args)
}
const generateAssFile = async (editedLyricData, osuPath, assPath) => {
  console.log("ipcRenderer generateAssFile")
  return await ipcRenderer.invoke('on-generate-ass-file-event', editedLyricData, osuPath, assPath)
}

// Modify config
const openConfig = async () => {
  console.log("ipcRenderer openConfigFile")
  return await ipcRenderer.invoke('on-open-config-event')
}
const modifyRulerJa = async () => {
  console.log("ipcRenderer modifyRulerJa")
  return await ipcRenderer.invoke('on-modify-ruler-ja-event')
}
const modifyConfig = async () => {
  console.log("ipcRenderer modifyConfig")
  return await ipcRenderer.invoke('on-modify-config-event')
}


contextBridge.exposeInMainWorld('myApi', {
  test,
  selectAssPath,
  selectOsuPath,
  selectLyricPath,
  processAssFile,
  processOsuFile,
  processLyricFile,
  modifyRulerJa,
  modifyConfig,
  openConfig,
  generateAssFile,
  loadAllFile,
  loadLyricFile,
  loadOsuFile,
})










