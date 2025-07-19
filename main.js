const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { descargarVideo, obtenerInfoVideo } = require('./backend/downloader');
ipcMain.handle('obtener-info-video', async (event, url) => {
  try {
    const info = await obtenerInfoVideo(url);
    return info;
  } catch (err) {
    return null;
  }
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    const startURL = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.handle('elegir-carpeta', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('descargar-video', async (event, { url, formato, ruta }) => {
  try {
    const resultPath = await descargarVideo(url, formato, ruta);
    return { ok: true, path: resultPath };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('bloquear-ventana', async (event, bloquear) => {
  if (mainWindow) {
    mainWindow.setEnabled(!bloquear);
    if (!bloquear) {
      setTimeout(() => {
        if (!mainWindow.isFocused()) {
          mainWindow.focus();
        }
      }, 100);
    }
  }
});