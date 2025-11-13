export interface FileAPI {
  select: (options?: {
    filters?: Array<{ name: string; extensions: string[] }>;
    multiple?: boolean;
  }) => Promise<{
    success: boolean;
    filePaths?: string[];
    canceled?: boolean;
    error?: string;
  }>;
  
  upload: (sourcePath: string, options?: {
    maxSize?: number;
    allowedExtensions?: string[];
    uploadDir?: string;
    generateUniqueName?: boolean;
  }) => Promise<{
    success: boolean;
    filePath?: string;
    fileName?: string;
    originalName?: string;
    fileSize?: number;
    mimeType?: string;
    error?: string;
  }>;
  
  uploadBase64: (base64Data: string, fileName: string, options?: any) => Promise<{
    success: boolean;
    filePath?: string;
    error?: string;
  }>;
  
  delete: (relativePath: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  
  getBase64: (relativePath: string) => Promise<{
    success: boolean;
    data?: string;
    error?: string;
  }>;
}

declare global {
  interface Window {
    fileAPI: FileAPI;
    db: {
      execute: (operation: any, data: any) => Promise<any>;
    };
  }
}