import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { app } from 'electron';

const copyFile = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

export class FileUploadService {
  static instance;
  baseUploadDir;

  constructor() {
    if (FileUploadService.instance) {
      return FileUploadService.instance;
    }
    this.baseUploadDir = path.join(app.getPath('userData'), 'uploads');

    console.log("file upload base url initializa",   this.baseUploadDir );
    FileUploadService.instance = this;
  }

  static getInstance() {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  // Initialize upload directories
  async initialize() {
    console.log("file upload base url::",this.baseUploadDir);
    try {
      await mkdir(this.baseUploadDir, { recursive: true });
      const subdirs = ['logos', 'documents', 'images', 'temp'];
      for (const subdir of subdirs) {
        await mkdir(path.join(this.baseUploadDir, subdir), { recursive: true });
      }
    } catch (error) {
      console.error('Failed to initialize upload directories:', error);
      throw new Error('Upload directory initialization failed');
    }
  }

  // Upload a single file
  async uploadFile(sourcePath, options = {}) {
    try {
      let fileStats;
      try {
        fileStats = await stat(sourcePath);
      } catch (error) {
        return { success: false, error: 'Source file not found or inaccessible' };
      }

      const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
      if (fileStats.size > maxSize) {
        return {
          success: false,
          error: `File size exceeds ${this.formatBytes(maxSize)} limit`,
        };
      }

      const ext = path.extname(sourcePath).toLowerCase();
      if (options.allowedExtensions && !options.allowedExtensions.includes(ext)) {
        return {
          success: false,
          error: `File type ${ext} not allowed. Allowed types: ${options.allowedExtensions.join(', ')}`,
        };
      }

      const uploadSubDir = options.uploadDir || this.getSubDirByExtension(ext);
      const uploadDir = path.join(this.baseUploadDir, uploadSubDir);
      await mkdir(uploadDir, { recursive: true });

      const originalName = path.basename(sourcePath);
      const fileName =
        options.generateUniqueName === false
          ? originalName
          : this.generateUniqueFileName(originalName);

      const absolutePath = path.join(uploadDir, fileName);
      const relativePath = path.join(uploadSubDir, fileName);

      await copyFile(sourcePath, absolutePath);

      const mimeType = this.getMimeType(ext);

      return {
        success: true,
        filePath: relativePath.replace(/\\/g, '/'),
        absolutePath,
        fileName,
        originalName,
        fileSize: fileStats.size,
        mimeType,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message || 'Upload failed' };
    }
  }

  // Upload from base64 string
  async uploadFromBase64(base64Data, fileName, options = {}) {
    try {
      const base64String = base64Data.replace(/^data:.*?;base64,/, '');
      const buffer = Buffer.from(base64String, 'base64');

      const maxSize = options.maxSize || 10 * 1024 * 1024;
      if (buffer.length > maxSize) {
        return {
          success: false,
          error: `File size exceeds ${this.formatBytes(maxSize)} limit`,
        };
      }

      const ext = path.extname(fileName).toLowerCase();
      if (options.allowedExtensions && !options.allowedExtensions.includes(ext)) {
        return { success: false, error: `File type ${ext} not allowed` };
      }

      const uploadSubDir = options.uploadDir || this.getSubDirByExtension(ext);
      const uploadDir = path.join(this.baseUploadDir, uploadSubDir);
      await mkdir(uploadDir, { recursive: true });

      const uniqueFileName =
        options.generateUniqueName === false
          ? fileName
          : this.generateUniqueFileName(fileName);

      const absolutePath = path.join(uploadDir, uniqueFileName);
      const relativePath = path.join(uploadSubDir, uniqueFileName);

      await fs.promises.writeFile(absolutePath, buffer);

      return {
        success: true,
        filePath: relativePath.replace(/\\/g, '/'),
        absolutePath,
        fileName: uniqueFileName,
        originalName: fileName,
        fileSize: buffer.length,
        mimeType: this.getMimeType(ext),
      };
    } catch (error) {
      console.error('Base64 upload error:', error);
      return { success: false, error: error.message || 'Upload failed' };
    }
  }

  // Delete file
  async deleteFile(relativePath) {
    try {
      const absolutePath = path.join(this.baseUploadDir, relativePath);
      await unlink(absolutePath);
      return true;
    } catch (error) {
      console.error('Delete file error:', error);
      return false;
    }
  }

  // Get absolute path
  getAbsolutePath(relativePath) {
    return path.join(this.baseUploadDir, relativePath);
  }

  // Read file as base64
  async getFileAsBase64(relativePath) {
    try {
      const absolutePath = this.getAbsolutePath(relativePath);
      const buffer = await readFile(absolutePath);
      return buffer.toString('base64');
    } catch (error) {
      console.error('Read file error:', error);
      return null;
    }
  }

  // Helper methods
  generateUniqueFileName(originalName) {
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${nameWithoutExt}-${timestamp}-${random}${ext}`;
  }

  getSubDirByExtension(ext) {
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const docExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv'];

    if (imageExts.includes(ext)) return 'images';
    if (docExts.includes(ext)) return 'documents';
    if (['.svg', '.png', '.jpg', '.jpeg'].includes(ext)) return 'logos';
    return 'temp';
  }

  getMimeType(ext) {
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.txt': 'text/plain',
      '.csv': 'text/csv',
    };
    return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
  }

  formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}
