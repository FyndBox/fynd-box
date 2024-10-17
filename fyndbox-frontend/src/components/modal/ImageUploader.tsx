import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Clear } from '@mui/icons-material';
import imageFallback from '../../assets/AddImage.png'; // Use your fallback image here
import {
  ClearButton,
  ImageBox,
  ImageLabel,
  ImageUploaderContainer,
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

  useEffect(() => {
    setImage(initialImage ?? '');
  }, [initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        onImageUpload(base64String); // Return the image to parent component
      };
      reader.readAsDataURL(file);
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
          capture="environment"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Box>
      {image && (
        <ClearButton size="small" onClick={handleClearImage}>
          <Clear />
        </ClearButton>
      )}
    </ImageUploaderContainer>
  );
};

export default ImageUploader;
