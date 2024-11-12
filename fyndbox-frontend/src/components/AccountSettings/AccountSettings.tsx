import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import { AccountCircle, Check, Email, PhotoCamera } from '@mui/icons-material';
import { useUpdateUser, useUser } from '../../hooks/useUser';
import { useUploadImage } from '../../hooks/useImage';
import {
  ButtonsGroupWrapper,
  CustomIcon,
  TextFieldsContainer,
} from '../../styles/commonStyles';
import CustomTextField from '../CustomTextField/CustomTextField';
import { SaveButton } from '../ActionButtonsGroup/ActionButtonsGroup.styles';
import {
  AccountSettingsContainer,
  ProfileAvatar,
  ProfileContainer,
} from './AccountSettings.styles';
import { useNavigate } from 'react-router-dom';

const AccountSettings: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user, error, isLoading } = useUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: uploadImage, isPending } = useUploadImage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [initialName, setInitialName] = useState('');
  const [initialProfileImage, setInitialProfileImage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setProfileImage(user.image || null);
      setInitialName(user.name || '');
      setInitialProfileImage(user.image || null);
    }
  }, [user]);

  useEffect(() => {
    setIsChanged(name !== initialName || profileImage !== initialProfileImage);
  }, [name, profileImage, initialName, initialProfileImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file, {
        onSuccess: (data) => {
          setProfileImage(data.imageUrl);
        },
      });
    }
  };

  const handleSave = () => {
    if (!name) {
      setNameError(true);
      return;
    }

    updateUser(
      { user: { name, image: profileImage ?? undefined } },
      {
        onSuccess: () => {
          setInitialName(name);
          setInitialProfileImage(profileImage);
          setIsChanged(false);
          navigate('/dashboard');
        },
        onError: (error) => {
          console.error('Failed to update user:', error);
        },
      },
    );
  };

  return (
    <AccountSettingsContainer>
      {isLoading && <Typography variant="body1">Loading...</Typography>}
      <ProfileContainer>
        <ProfileAvatar src={profileImage || ''} alt={name} />
        <IconButton
          color="primary"
          component="label"
          sx={{
            position: 'absolute',
            bottom: -10,
            right: -10,
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
      </ProfileContainer>

      <TextFieldsContainer>
        <CustomTextField
          label={t('common.name.label')}
          placeholder={t('common.name.placeholder')}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
          error={nameError}
          helperText={
            nameError
              ? t('common.name.errorMessage')
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

      <ButtonsGroupWrapper>
        <SaveButton
          variant="contained"
          fullWidth
          startIcon={
            <CustomIcon>
              <Check />
            </CustomIcon>
          }
          onClick={handleSave}
          disabled={!isChanged}
        >
          {t('modal.save')}
        </SaveButton>
      </ButtonsGroupWrapper>
      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
