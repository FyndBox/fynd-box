import {
  MarkEmailRead,
  MarkEmailUnread,
  Notifications,
} from '@mui/icons-material';
import { Avatar, Box, Menu, MenuItem, styled, Typography } from '@mui/material';

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

export const StyledNotification = styled(Notifications)(({}) => ({
  fontSize: 30,
}));

export const CustomAvatar = styled(Avatar)(({}) => ({
  width: 40,
  height: 40,
  objectFit: 'cover',
}));

export const CustomMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxHeight: 400,
    width: 350,
    padding: theme.spacing(1),
  },
}));

export const StyledReadIcon = styled(MarkEmailRead)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.grey[700],
}));

export const StyledUnreadIcon = styled(MarkEmailUnread)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.info.main,
}));

export const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
}));

export const CustomNotificationTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.typography.h6.fontSize,
}));

export const SeeAllText = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: theme.typography.body2.fontSize,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const NoNotificationsText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  padding: theme.spacing(2),
}));

export const NotificationTextWrapper = styled(Box)({
  flexGrow: 1,
  overflow: 'hidden',
});

export const NotificationTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.typography.body1.fontSize,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const NotificationMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const NotificationDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
}));
