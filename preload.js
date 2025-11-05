// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron');
// contextBridge.exposeInMainWorld('api', {
//   getProducts: () => ipcRenderer.invoke('get-products'),
//   addProduct: (data) => ipcRenderer.invoke('add-product', data)
// });

contextBridge.exposeInMainWorld("api", {
  product: {
    add: (data) => ipcRenderer.invoke("product:add", data),
    list: () => ipcRenderer.invoke("product:list"),
    update: (data) => ipcRenderer.invoke("product:update", data),
    delete: (id) => ipcRenderer.invoke("product:delete", id)
  }
});
