import { Select, styled } from '@mui/material';

export const FlagIcon = styled('img')({
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '0.25rem',
  marginRight: '1rem',
});

export const LanguageSelect = styled(Select)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 140,
  backgroundColor: 'transparent',
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.common.white,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.common.white,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.common.white,
  },
}));
