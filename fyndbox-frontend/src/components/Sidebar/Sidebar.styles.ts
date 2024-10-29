import { Avatar, Box, styled } from '@mui/material';
import { BaseButton } from '../../styles/commonStyles';

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 400,
  padding: theme.spacing(2.5),
}));

export const IconButtonContainer = styled(Box)(({}) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const SidebarElementContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1.25),
}));

export const AvatarContainer = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

export const LinkElement = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  marginBottom: theme.spacing(1.25),
  width: '100%',
}));

export const LinkButton = styled(BaseButton)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(1.25, 0),
  textTransform: 'none',
  color: theme.palette.secondary.contrastText,
}));

export const LogoutButton = styled(BaseButton)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  border: `1px solid ${theme.palette.secondary.contrastText}`,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export const DeactivateButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));
