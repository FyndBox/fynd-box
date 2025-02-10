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
import {
  useMarkNotificationAsRead,
  useNotifications,
} from '../../hooks/useCustomNotification';

const CustomNotifications: FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: notifications } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  return (
    <Box>
      <IconButton edge="end" color="secondary" onClick={handleOpenMenu}>
        <Badge badgeContent={unreadCount} color="error">
          <Notifications sx={{ fontSize: 30 }} />
        </Badge>
      </IconButton>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 300,
              width: 300,
            },
          },
        }}
      >
        {notifications && notifications.length === 0 ? (
          <MenuItem onClick={handleCloseMenu}>
            <Typography variant="body2">
              {t('notifications.noNotifications')}
            </Typography>
          </MenuItem>
        ) : (
          notifications &&
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                handleMarkAsRead(notification.id);
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
                  {new Date(notification.updatedAt).toLocaleDateString(
                    'en-GB',
                    {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    },
                  )}
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
