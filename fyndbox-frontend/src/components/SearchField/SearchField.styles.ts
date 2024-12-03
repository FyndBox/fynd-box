import { Box, IconButton, styled, TextField } from '@mui/material';

export const SearchFieldContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SearchIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  borderRadius: '50%',
  padding: theme.spacing(1),
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: '50px',
  width: '300px',
  paddingLeft: theme.spacing(1.5),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent', // No border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent', // No border on focus
    },
  },
}));
