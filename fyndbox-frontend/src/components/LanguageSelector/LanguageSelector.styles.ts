import { Box, styled, Typography } from '@mui/material';

interface LanguageOptionProps {
  isActive: boolean;
}

export const LanguageSelectorWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6, 0),
}));

export const FlagIcon = styled('img')(({ theme }) => ({
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
  marginRight: theme.spacing(1),
}));

export const LanguageOption = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<LanguageOptionProps>(
  ({ theme, isActive }: { theme: any; isActive?: boolean }) => ({
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
    color: isActive ? theme.palette.primary.main : 'inherit',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  }),
);

export const Divider = styled('span')(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.grey[400],
}));
