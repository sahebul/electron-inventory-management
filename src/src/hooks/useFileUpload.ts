import { useState, useCallback } from 'react';

export interface UseFileUploadOptions {
  maxSize?: number;
  allowedExtensions?: string[];
  uploadDir?: string;
  onSuccess?: (filePath: string) => void;
  onError?: (error: string) => void;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const selectAndUpload = useCallback(async () => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      // Select file
      const selectResult = await window.fileAPI.select({
        filters: options.allowedExtensions ? [
          {
            name: 'Allowed Files',
            extensions: options.allowedExtensions.map(ext => ext.replace('.', '')),
          },
        ] : undefined,
        multiple: false,
      });

      if (selectResult.canceled) {
        setUploading(false);
        return null;
      }

      if (!selectResult.success || !selectResult.filePaths?.[0]) {
        const errorMsg = selectResult.error || 'File selection failed';
        setError(errorMsg);
        options.onError?.(errorMsg);
        setUploading(false);
        return null;
      }

      setProgress(50);

      // Upload file
      const uploadResult = await window.fileAPI.upload(selectResult.filePaths[0], {
        maxSize: options.maxSize,
        allowedExtensions: options.allowedExtensions,
        uploadDir: options.uploadDir,
      });

      setProgress(100);

      if (!uploadResult.success) {
        const errorMsg = uploadResult.error || 'Upload failed';
        setError(errorMsg);
        options.onError?.(errorMsg);
        setUploading(false);
        return null;
      }

      options.onSuccess?.(uploadResult.filePath!);
      setUploading(false);
      return uploadResult;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      options.onError?.(errorMsg);
      setUploading(false);
      return null;
    }
  }, [options]);

  const uploadBase64 = useCallback(async (base64Data: string, fileName: string) => {
    try {
      setUploading(true);
      setError(null);

      const result = await window.fileAPI.uploadBase64(base64Data, fileName, {
        maxSize: options.maxSize,
        allowedExtensions: options.allowedExtensions,
        uploadDir: options.uploadDir,
      });

      if (!result.success) {
        const errorMsg = result.error || 'Upload failed';
        setError(errorMsg);
        options.onError?.(errorMsg);
        setUploading(false);
        return null;
      }

      options.onSuccess?.(result.filePath!);
      setUploading(false);
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      options.onError?.(errorMsg);
      setUploading(false);
      return null;
    }
  }, [options]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
  }, []);

  return {
    uploading,
    error,
    progress,
    selectAndUpload,
    uploadBase64,
    reset,
  };
}