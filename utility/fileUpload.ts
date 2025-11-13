import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { app } from 'electron';

const copyFile = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

export interface FileUploadOptions {
  maxSize?: number; // in bytes, default 10MB
  allowedExtensions?: string[]; // e.g., ['.jpg', '.png', '.pdf']
  uploadDir?: string; // custom upload directory
  generateUniqueName?: boolean; // default true
}

export interface FileUploadResult {
  success: boolean;
  filePath?: string; // Relative path to save in DB
  absolutePath?: string; // Full system path
  fileName?: string;
  originalName?: string;
  fileSize?: number;
  mimeType?: string;
  error?: string;
}

export class FileUploadService {
  private static instance: FileUploadService;
  private baseUploadDir: string;

  private constructor() {
    this.baseUploadDir = path.join(app.getPath('userData'), 'uploads');
  }

  public static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  /**
   * Initialize upload directories
   */
  public async initialize(): Promise<void> {
    try {
      await mkdir(this.baseUploadDir, { recursive: true });
      
      // Create subdirectories for organization
      const subdirs = ['logos', 'documents', 'images', 'temp'];
      for (const subdir of subdirs) {
        await mkdir(path.join(this.baseUploadDir, subdir), { recursive: true });
      }
    } catch (error) {
      console.error('Failed to initialize upload directories:', error);
      throw new Error('Upload directory initialization failed');
    }
  }

  /**
   * Upload a single file
   */
  public async uploadFile(
    sourcePath: string,
    options: FileUploadOptions = {}
  ): Promise<FileUploadResult> {
    try {
      // Validate source file exists
      let fileStats;
      try {
        fileStats = await stat(sourcePath);
      } catch (error) {
        return {
          success: false,
          error: 'Source file not found or inaccessible',
        };
      }

      // Validate file size
      const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
      if (fileStats.size > maxSize) {
        return {
          success: false,
          error: `File size exceeds ${this.formatBytes(maxSize)} limit`,
        };
      }

      // Validate file extension
      const ext = path.extname(sourcePath).toLowerCase();
      if (options.allowedExtensions && !options.allowedExtensions.includes(ext)) {
        return {
          success: false,
          error: `File type ${ext} not allowed. Allowed types: ${options.allowedExtensions.join(', ')}`,
        };
      }

      // Determine upload directory
      const uploadSubDir = options.uploadDir || this.getSubDirByExtension(ext);
      const uploadDir = path.join(this.baseUploadDir, uploadSubDir);
      await mkdir(uploadDir, { recursive: true });

      // Generate file name
      const originalName = path.basename(sourcePath);
      const fileName = options.generateUniqueName !== false
        ? this.generateUniqueFileName(originalName)
        : originalName;

      // Full paths
      const absolutePath = path.join(uploadDir, fileName);
      const relativePath = path.join(uploadSubDir, fileName);

      // Copy file
      await copyFile(sourcePath, absolutePath);

      // Get MIME type
      const mimeType = this.getMimeType(ext);

      return {
        success: true,
        filePath: relativePath.replace(/\\/g, '/'), // Use forward slashes for DB
        absolutePath,
        fileName,
        originalName,
        fileSize: fileStats.size,
        mimeType,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Upload file from base64 data (useful for web forms)
   */
  public async uploadFromBase64(
    base64Data: string,
    fileName: string,
    options: FileUploadOptions = {}
  ): Promise<FileUploadResult> {
    try {
      // Remove data URL prefix if present
      const base64String = base64Data.replace(/^data:.*?;base64,/, '');
      const buffer = Buffer.from(base64String, 'base64');

      // Validate size
      const maxSize = options.maxSize || 10 * 1024 * 1024;
      if (buffer.length > maxSize) {
        return {
          success: false,
          error: `File size exceeds ${this.formatBytes(maxSize)} limit`,
        };
      }

      // Validate extension
      const ext = path.extname(fileName).toLowerCase();
      if (options.allowedExtensions && !options.allowedExtensions.includes(ext)) {
        return {
          success: false,
          error: `File type ${ext} not allowed`,
        };
      }

      // Determine upload directory
      const uploadSubDir = options.uploadDir || this.getSubDirByExtension(ext);
      const uploadDir = path.join(this.baseUploadDir, uploadSubDir);
      await mkdir(uploadDir, { recursive: true });

      // Generate unique file name
      const uniqueFileName = options.generateUniqueName !== false
        ? this.generateUniqueFileName(fileName)
        : fileName;

      const absolutePath = path.join(uploadDir, uniqueFileName);
      const relativePath = path.join(uploadSubDir, uniqueFileName);

      // Write file
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
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Delete a file
   */
  public async deleteFile(relativePath: string): Promise<boolean> {
    try {
      const absolutePath = path.join(this.baseUploadDir, relativePath);
      await unlink(absolutePath);
      return true;
    } catch (error) {
      console.error('Delete file error:', error);
      return false;
    }
  }

  /**
   * Get absolute path from relative path
   */
  public getAbsolutePath(relativePath: string): string {
    return path.join(this.baseUploadDir, relativePath);
  }

  /**
   * Read file as base64 (useful for sending to renderer)
   */
  public async getFileAsBase64(relativePath: string): Promise<string | null> {
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
  private generateUniqueFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${nameWithoutExt}-${timestamp}-${random}${ext}`;
  }

  private getSubDirByExtension(ext: string): string {
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const docExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv'];
    
    if (imageExts.includes(ext)) return 'images';
    if (docExts.includes(ext)) return 'documents';
    if (['.svg', '.png', '.jpg', '.jpeg'].includes(ext)) return 'logos';
    return 'temp';
  }

  private getMimeType(ext: string): string {
    const mimeTypes: Record<string, string> = {
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

  private formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}