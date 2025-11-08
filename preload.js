const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('db', {
  execute: (operation, data) => 
    ipcRenderer.invoke('database-operation', operation, data)
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
