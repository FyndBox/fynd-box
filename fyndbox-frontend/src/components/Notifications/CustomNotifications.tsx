import { FC, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
}

const CustomNotifications: FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'Box "Garage" was created',
      date: '2025-01-30',
      isRead: false,
    },
    {
      id: 2,
      message: 'Weekly reminder: Box "Storage Room" created on 2025-01-20',
      date: '2025-01-29',
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  return (
    <Box>
      <IconButton
        edge="end"
        color="secondary"
        onClick={handleOpenMenu}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Notifications sx={{ fontSize: 30 }} />
        </Badge>
      </IconButton>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: '300px',
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem onClick={handleCloseMenu}>
            <Typography variant="body2">
              {t('notifications.noNotifications')}
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                markAsRead(notification.id);
                handleCloseMenu();
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={!notification.isRead ? 'bold' : 'normal'}
                >
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {notification.date}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default CustomNotifications;
