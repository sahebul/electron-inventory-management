import { app, BrowserWindow, ipcMain,dialog  } from 'electron';
import dotenv from "dotenv";
import { watch } from 'fs';
// import path from 'path';
import { fileURLToPath,pathToFileURL  } from 'url';
import path, { dirname } from 'path';
const isDev = !app.isPackaged;
// import { productService,businessService } from './src/services/productService.js';
// import { businessService,productService } from './backend/services/dbSerive.js';
import PrismaErrorHandler  from './utility/errorHandler.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
// let services = null;
import prisma from './config/prisma.js';
import { validateOperation } from './middleWare/validationMiddleware.js';
import { validationRegistry } from './utility/validationSchema.js';
import { FileUploadService } from './utility/fileUpload.js';
// import { z } from 'zod'; 
const fileUploadService = FileUploadService.getInstance();
  
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
     
     // Synchronous validation - no await needed
    const validation = validateOperation(operation, data, validationRegistry)
     
    // Check validation result
    if (!validation.isValid) {
      return {
        success: false,
        error: {
          type: 'VALIDATION_ERROR',
          message: 'Input validation failed',
          details: validation.errors || []
        }, 
        data: validation.data || []
      } 
    }
     
 
    // const result = await prisma[operation.model][operation.action](data);
     const result = await prisma[operation.model][operation.action](validation.data)
    return { success: true, data: result };
  } catch (error) {
 
    return PrismaErrorHandler.handle(error);
  }
});  



// NEW: File selection handler
ipcMain.handle('file:select', async (event, options = {}) => {
  try {
    const { filters = [], multiple = false } = options;
    
    const result = await dialog.showOpenDialog({
      properties: multiple ? ['openFile', 'multiSelections'] : ['openFile'],
      filters: filters.length > 0 ? filters : [
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'] },
        { name: 'Documents', extensions: ['pdf', 'doc', 'docx'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (result.canceled) {
      return { success: false, canceled: true };
    }

    return { success: true, filePaths: result.filePaths };
  } catch (error) {
    console.error('File selection error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Selection failed',
    };
  }
});

// NEW: File upload handler
ipcMain.handle('file:upload', async (event, sourcePath, options = {}) => {
  try {
    const result = await fileUploadService.uploadFile(sourcePath, options);
    return result;
  } catch (error) {
    console.error('Upload handler error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
});

// NEW: Base64 upload handler
ipcMain.handle('file:upload-base64', async (event, base64Data, fileName, options = {}) => {
  try {
    const result = await fileUploadService.uploadFromBase64(base64Data, fileName, options);
    return result;
  } catch (error) {
    console.error('Base64 upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
});

// NEW: File deletion handler
ipcMain.handle('file:delete', async (event, relativePath) => {
  try {
    const result = await fileUploadService.deleteFile(relativePath);
    return { success: result };
  } catch (error) {
    console.error('Delete handler error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
});

// NEW: Get file as base64 (for displaying in renderer)
ipcMain.handle('file:get-base64', async (event, relativePath) => {
  try {
    const base64 = await fileUploadService.getFileAsBase64(relativePath);
    if (!base64) {
      return { success: false, error: 'File not found' };
    }
    return { success: true, data: base64 };
  } catch (error) {
    console.error('Get file error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to read file',
    };
  }
});
 

