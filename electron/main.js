const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    ipcMain.on('open-file-dialog', (event) => {
        dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"]
        }).then(result => {
            if (result.canceled === false) {
                event.sender.send('select-file', result.filePaths[0]);
            }
        }).catch(err => {
            console.log(err);
        })
    })
}
app.on('ready', createWindow);