import { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import imageFallback from '../../assets/AddImage.png'; // Use your fallback image here

interface ImageUploaderProps {
 initialImage?: string; // Initial image from props if available
 onImageUpload: (image: string) => void; // Callback to return uploaded image
 label?: string; // Optional label for the image uploader
}

const ImageUploader: FC<ImageUploaderProps> = ({ initialImage, onImageUpload, label }) => {
 const [image, setImage] = useState<string | undefined>(initialImage || undefined);

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
   <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
     {/* Image Label */}
     <Typography variant="h6" align="left" sx={{ marginBottom: '16px' }}>
       {label || 'Bild'}
     </Typography>
     
     {/* Display uploaded image or fallback */}
     <Box
       component="img"
       src={image || imageFallback}
       alt="Uploaded image"
       sx={{
         width: 120,
         height: 120,
         borderRadius: '8px',
         objectFit: 'cover',
         border: '1px solid #ccc',
         marginBottom: '16px',
       }}
     />
     
     <Button variant="outlined" component="label" startIcon={<AddAPhotoIcon />}>
       {image ? 'Change Image' : 'Upload Image'}
       <input type="file" hidden accept="image/*" onChange={handleImageChange} />
     </Button>
   </Box>
 );
};

export default ImageUploader;