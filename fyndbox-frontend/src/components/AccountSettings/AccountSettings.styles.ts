import { Avatar, Box, IconButton, styled } from '@mui/material';

export const AccountSettingsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

export const ProfileContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(3, 0),
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  padding: theme.spacing(2),
  width: 100,
  height: 100,
}));

export const AvatarButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(-1.2),
  right: theme.spacing(-1.2),
  backgroundColor: theme.palette.common.white,
}));
