import { MenuItem, styled } from '@mui/material';

interface CustomMenuItemProps {
  isRead: boolean;
}

export const CustomMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'isRead',
})<CustomMenuItemProps>(
  ({ theme, isRead }: { theme: any; isRead?: boolean }) => ({
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    backgroundColor: isRead
      ? theme.palette.secondary.main
      : theme.palette.secondary.light,
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
    py: theme.spacing(1.2),
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
);
