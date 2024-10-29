import { FC, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';
import { useUploadImage } from '../../hooks/useImage';

const AccountSettings: FC = () => {
  const { data: user } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || ''); // Email is readonly, so we don't need a setState for it
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.image || null,
  );

  // Use the custom hook for uploading an image
  const { mutate: uploadImage, isPending } = useUploadImage();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Use the mutation hook to upload the file
      uploadImage(file, {
        onSuccess: (data) => {
          setProfileImage(data.imageUrl); // Set the uploaded image URL as the profile image
        },
      });
    }
  };

  const handleSave = () => {
    // Save the changes (name and profile image)
    console.log('Name:', name);
    console.log('Profile Image URL:', profileImage);
    // Here you would call an API to update the user data in the backend
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" mb={2}>
        Account Settings
      </Typography>

      <Box position="relative" mb={3}>
        <Avatar
          src={profileImage || ''}
          alt={name}
          sx={{ width: 100, height: 100 }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{
            position: 'absolute',
            bottom: -10,
            right: -10,
            backgroundColor: 'white',
            boxShadow: 2,
          }}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
          {isPending ? <CircularProgress size={24} /> : <PhotoCamera />}
        </IconButton>
      </Box>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Email"
        value={email}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        disabled
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        fullWidth
        sx={{ mt: 3 }}
      >
        Save
      </Button>
    </Box>
  );
};

export default AccountSettings;
