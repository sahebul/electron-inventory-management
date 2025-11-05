import { app, BrowserWindow, ipcMain } from 'electron';
import dotenv from "dotenv";
// import path from 'path';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const isDev = !app.isPackaged;
import { productService } from './src/services/productService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    // win.loadFile(path.join(__dirname, 'dist/index.html'));
    win.loadFile(path.join(__dirname, 'dist/index.html')).catch(() => {
    // fallback if subpage opened directly
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Example SQLite IPC handler
// // const db = require('./database/db');
// const db = require(path.join(__dirname, 'database', 'db'));

// ipcMain.handle('get-products', async () => {
//   return db.getProducts();
// });

// ipcMain.handle('add-product', async (event, data) => {
//   return db.addProduct(data);
// });



// ipcMain.handle("get-products", async () => {
//   return await productService.getAll();
// });

// ipcMain.handle("add-product", async (event, product) => {
//   return await productService.create(product);
// });

// ipcMain.handle("update-product", async (event, id, product) => {
//   return await productService.update(id, product);
// });

// ipcMain.handle("delete-product", async (event, id) => {
//   return await productService.delete(id);
// });

ipcMain.handle("product:add", async (_, data) => productService.create(data));
ipcMain.handle("product:list", async () => productService.getAll());
ipcMain.handle("product:delete", async (_, id) => productService.delete(id));
ipcMain.handle("product:update", async (_, product) => productService.update(product));
