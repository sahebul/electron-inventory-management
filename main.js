import { app, BrowserWindow, ipcMain } from 'electron';
import dotenv from "dotenv";
import { watch } from 'fs';
// import path from 'path';
import { fileURLToPath,pathToFileURL  } from 'url';
import path, { dirname } from 'path';
const isDev = !app.isPackaged;
// import { productService,businessService } from './src/services/productService.js';
// import { businessService,productService } from './backend/services/dbSerive.js';
import PrismaErrorHandler  from './backend/errorHandler.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
// let services = null;
import prisma from './backend/prisma.js';


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
 
app.on('before-quit', async () => {
  // Disconnect Prisma when app closes
  const { default: prisma } = await import('./backend/db/prisma.js');
  await prisma.$disconnect();  
});
ipcMain.handle('database-operation', async (event, operation, data) => {
  try {
    const result = await prisma[operation.model][operation.action](data);
    return { success: true, data: result };
  } catch (error) {
    return PrismaErrorHandler.handle(error);
  }
}); 
 

