import { FC, useState } from 'react';
import {
  Box,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { AccountCircle, Check, Email, PhotoCamera } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';
import { useUploadImage } from '../../hooks/useImage';
import { CustomIcon, TextFieldsContainer } from '../../styles/commonStyles';
import CustomTextField from '../CustomTextField/CustomTextField';
import { useTranslation } from 'react-i18next';
import { SaveButton } from '../ActionButtonsGroup/ActionButtonsGroup.styles';

const AccountSettings: FC = () => {
  const { t } = useTranslation();
  const { data: user, error, isLoading } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || ''); // Email is readonly, so we don't need a setState for it
  const [nameError, setNameError] = useState(false);
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

      <TextFieldsContainer>
        <CustomTextField
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
            // if (error) setError(null);
          }}
          error={nameError}
          helperText={
            nameError
              ? t('signup.name.errorMessage')
                  .split('\n')
                  .map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
              : ''
          }
          startIcon={<AccountCircle />}
        />
        <CustomTextField
          label={t('common.email.label')}
          placeholder={t('common.email.placeholder')}
          type="email"
          value={email}
          startIcon={<Email />}
          readOnly
          disabled
        />
      </TextFieldsContainer>

      <SaveButton
        variant="contained"
        sx={{ mt: 3 }}
        fullWidth
        startIcon={
          <CustomIcon>
            <Check />
          </CustomIcon>
        }
        onClick={() => handleSave()}
      >
        {t('modal.save')}
      </SaveButton>
    </Box>
  );
};

export default AccountSettings;
