// import { FC, useState } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import imageFallback from '../../assets/AddImage.png'; // Use your fallback image here

// interface ImageUploaderProps {
//   initialImage?: string;
//   onImageUpload: (image: string) => void;
//   label?: string;
// }

// const ImageUploader: FC<ImageUploaderProps> = ({
//   initialImage,
//   onImageUpload,
//   label,
// }) => {
//   const [image, setImage] = useState<string | undefined>(
//     initialImage || undefined,
//   );

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setImage(base64String);
//         onImageUpload(base64String); // Return the image to parent component
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//       {/* Image Label */}
//       <Typography variant="h6" align="left" sx={{ marginBottom: '16px' }}>
//         {label || 'Bild'}
//       </Typography>

//       {/* Display uploaded image or fallback */}
//       <Box
//         component="img"
//         src={image || imageFallback}
//         alt="Uploaded image"
//         sx={{
//           width: 120,
//           height: 120,
//           borderRadius: '8px',
//           objectFit: 'cover',
//           border: '1px solid #ccc',
//           marginBottom: '16px',
//         }}
//       />

//       <Button
//         variant="outlined"
//         component="label"
//         startIcon={<AddAPhotoIcon />}
//       >
//         {image ? 'Change Image' : 'Upload Image'}
//         <input
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </Button>
//     </Box>
//   );
// };

// export default ImageUploader;

import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import imageFallback from '../../assets/AddImage.png'; // Use your fallback image here
import {
  ImageBox,
  ImageLabel,
  ImageUploaderContainer,
} from './EntityActionModal.styles';
import { useTranslation } from 'react-i18next';

interface ImageUploaderProps {
  initialImage?: string;
  onImageUpload: (image: string) => void;
  label?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  initialImage,
  onImageUpload,
  label = 'Bild', // Default label
}) => {
  const { t } = useTranslation();
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
      <ImageLabel variant="h6">{t('modal.image.label')}</ImageLabel>
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
