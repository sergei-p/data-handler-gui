// const { contextBridge, ipcMain, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

// let sendSubmit = (data) => {
//   ipcRenderer.send("theData", data)
// }

// letIndexBridge = {
//   sendSubmit: sendSubmit
// }

// contextBridge.exposeInMainWorld("Bridge", indexBridge)