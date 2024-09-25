import { AppBar, styled, Toolbar } from '@mui/material';

export const AppBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  height: '100px',
}));

export const ToolbarContainer = styled(Toolbar)(({}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
