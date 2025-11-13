import { Avatar, Box } from "@mui/material";
import { useState,useEffect  } from "react";

// Separate component for better performance
const LogoCell = ({ filePath, altText }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      if (!filePath) {
        setLoading(false);
        return;
      }

      try {
        const result = await window.fileAPI.getBase64(filePath);
        if (isMounted && result.success && result.data) {
          setPreview(`data:image/png;base64,${result.data}`);
        }
      } catch (error) {
        console.error('Preview load error:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadImage();

    return () => {
      isMounted = false; // Cleanup for unmounted cells
    };
  }, [filePath]);

  if (loading) {
    return <Box sx={{ width: 50, height: 50, bgcolor: 'grey.200' }} />;
  }

  if (!preview) return null;

  return (
    <Avatar
      src={preview}
      alt={altText}
      variant="rounded"
      sx={{ width: 50, height: 50 }}
    />
  );
};

export default LogoCell;