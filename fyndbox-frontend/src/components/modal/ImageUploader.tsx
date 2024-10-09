import { FC, useState } from 'react';
import { Box } from '@mui/material';
import imageFallback from '../../assets/AddImage.png'; // Use your fallback image here
import {
  ImageBox,
  ImageLabel,
  ImageUploaderContainer,
} from './EntityActionModal.styles';

interface ImageUploaderProps {
  initialImage?: string;
  onImageUpload: (image: string) => void;
  label?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  initialImage,
  onImageUpload,
  label = 'Image',
}) => {
  const [image, setImage] = useState<string | undefined>(
    initialImage || undefined,
  );

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

  return (
    <ImageUploaderContainer
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <ImageLabel variant="h6">{label}</ImageLabel>
      <Box component="label">
        <ImageBox src={image || imageFallback} alt="Uploaded image" />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Box>
    </ImageUploaderContainer>
  );
};

export default ImageUploader;
