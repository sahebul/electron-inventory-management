const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('db', {
  execute: (operation, data) => 
    ipcRenderer.invoke('database-operation', operation, data),
});

contextBridge.exposeInMainWorld('fileAPI', {
  select: (options) => ipcRenderer.invoke('file:select', options),
  upload: (sourcePath, options) => ipcRenderer.invoke('file:upload', sourcePath, options),
  uploadBase64: (base64Data, fileName, options) => 
    ipcRenderer.invoke('file:upload-base64', base64Data, fileName, options),
  delete: (relativePath) => ipcRenderer.invoke('file:delete', relativePath),
  getBase64: (relativePath) => ipcRenderer.invoke('file:get-base64', relativePath),
});




// // import { contextBridge, ipcRenderer } from 'electron';
// const { contextBridge, ipcRenderer } = require('electron');


// contextBridge.exposeInMainWorld("api", {
//   product: { 
//     add: (data) => ipcRenderer.invoke("product:add", data),
//     list: () => ipcRenderer.invoke("product:list"),
//     update: (data) => ipcRenderer.invoke("product:update", data),
//     delete: (id) => ipcRenderer.invoke("product:delete", id)
//   },
//   business: {
//     add: (data) => ipcRenderer.invoke("add-businesses", data),
//     list: () => ipcRenderer.invoke("get-businesses"),
//     update: (data) => ipcRenderer.invoke("business:update", data),
//     delete: (id) => ipcRenderer.invoke("business:delete", id)
//   }
// });
