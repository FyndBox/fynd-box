import {
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from '@mui/material';

export const FooterContainer = styled(BottomNavigation)(() => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: 'white',
  boxShadow: '0px -1px 6px rgba(0, 0, 0, 0.1)',
}));

export const FooterActionButton = styled(BottomNavigationAction)(
  ({ theme }) => ({
    color: theme.palette.secondary.contrastText,
  }),
);
