const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const emsFlasherPath = path.join(__dirname, '../public/ems-flasher/');
const { exec } = require('child_process');

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
    });

    ipcMain.on('save-file-dialog', (event, fileName) => {
        dialog.showSaveDialog(mainWindow, {
            title: `Save ${fileName}`,
            defaultPath: fileName,
            filters: [
                {name: 'Gameboy Game', extensions: ['gb']},
                {name: 'Gameboy Advance Game', extensions: ['gba']},
                {name: 'Gameboy Color Game', extensions: ['gbc']},
                {name: 'Save File', extensions: ['sav']}
            ]
        }).then(result => {
            if (result.canceled === false) {
                event.sender.send('select-file', result.filePath);
            }
        }).catch(err => {
            console.log(err);
        })
    });

    ipcMain.on('ems-flasher', (event, args) => {
        exec(`cd ${emsFlasherPath}; ./ems-flasher ${args}`,
            (error, stdout, stderr) => {
               event.sender.send('cart-data', stdout);
            }
        );
    });

    ipcMain.on('write-rom', (event, args) => {
        exec(`cd ${emsFlasherPath}; ./ems-flasher ${args}`,
            (error, stdout, stderr) => {
                event.sender.send('rom-status', error === null);
            }
        );
    });
}

app.on('ready', createWindow);