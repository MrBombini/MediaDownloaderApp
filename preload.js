const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  descargarVideo: (url, formato) => ipcRenderer.invoke('descargar-video', { url, formato }),
});
