import { FC, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';
import imageFallback from '../../assets/AddImage.png'; // Use your fallback image here
import { useUploadImage } from '../../hooks/useImage';
import {
  ImageUploaderContainer,
  ImageLabel,
  ImageBox,
  ClearButton,
} from './EntityActionModal.styles';

interface ImageUploaderProps {
  initialImage?: string;
  onImageUpload: (image: string | undefined) => void;
  label?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  initialImage,
  onImageUpload,
  label = 'Image',
}) => {
  const [image, setImage] = useState<string | undefined>(initialImage ?? '');
  const { mutate: uploadImage, error, isPending } = useUploadImage();

  useEffect(() => {
    setImage(initialImage ?? '');
  }, [initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadImage(file, {
        onSuccess: (uploadedImageUrl) => {
          setImage(uploadedImageUrl.imageUrl);
          onImageUpload(uploadedImageUrl.imageUrl);
        },
        onError: (err) => {
          console.error('Error uploading image:', err);
        },
      });
    }
  };

  const handleClearImage = () => {
    setImage('');
    onImageUpload('');
  };

  return (
    <ImageUploaderContainer
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <ImageLabel variant="body1">{label}</ImageLabel>
      <Box component="label">
        <ImageBox src={image || imageFallback} alt="Uploaded image" />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        {isPending && <CircularProgress size={24} />}
      </Box>

      {error && (
        <Typography variant="body2" color="error">
          Error uploading image
        </Typography>
      )}
      {image && (
        <ClearButton size="small" onClick={handleClearImage}>
          <Clear />
        </ClearButton>
      )}
    </ImageUploaderContainer>
  );
};

export default ImageUploader;
