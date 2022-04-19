
const { app, BrowserWindow, ipcMain } = require('electron')
import {PythonShell} from 'python-shell';
const path = require('path')
// const ipcRenderer =  require('electron').ipcRenderer


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // needed for using Node.js modules in frontend
      contextIsolation: false, // needed for using Node.js modules in frontend
      enableRemoteModule: true,
    },
    autoHideMenuBar: true // remove menu bar from the view
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.on("msg", (event, data) => {
  console.log(data)
  executePythonDataHandler(data)
})

const executePythonDataHandler = (filePathsObj) => {
  let options = {
    mode: 'text',
    pythoOPtions: ['-u'], // get print results in real-time
    scriptPath: '../backend/data-handler/',
    args: [filePathsObj.concentrationPath, filePathsObj.backpressurePath, filePathsObj.sprayFilmBudgeting, sprayFilmBudgeting.cfdSimulationResult]
  }

  // Later add functionality for displaying error and success messages in the User Interface
  PythonShell.run('index.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
  
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
