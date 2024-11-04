import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import { AccountCircle, Check, Email, PhotoCamera } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';
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
  AvatarButton,
  ProfileAvatar,
  ProfileContainer,
} from './AccountSettings.styles';

const AccountSettings: FC = () => {
  const { t } = useTranslation();
  const { data: user, error, isLoading } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);

  // Update state when user data is loaded
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setProfileImage(user.image || null);
    }
  }, [user]);

  const { mutate: uploadImage, isPending } = useUploadImage();

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
    console.log('Name:', name);
    console.log('Profile Image URL:', profileImage);
  };

  return (
    <AccountSettingsContainer>
      <ProfileContainer>
        <ProfileAvatar src={profileImage || ''} alt={name} />
        <AvatarButton color="primary">
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
          {isPending ? <CircularProgress size={24} /> : <PhotoCamera />}
        </AvatarButton>
      </ProfileContainer>

      <TextFieldsContainer>
        <CustomTextField
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
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
        >
          {t('modal.save')}
        </SaveButton>
      </ButtonsGroupWrapper>
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
