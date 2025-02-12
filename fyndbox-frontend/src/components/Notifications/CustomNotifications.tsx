import { FC, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import {
  Notifications,
  MarkEmailRead,
  MarkEmailUnread,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  useMarkNotificationAsRead,
  useNotifications,
} from '../../hooks/useCustomNotification';
import BoxIconSvg from '../../assets/box-icon-black.svg';

import { CustomNotification } from '../../types/custom-notification';
import { CustomMenuItem } from './CustomNotifications.styles';

const CustomNotifications: FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: notifications } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  const testNotifications: CustomNotification[] = [
    {
      id: '1',
      title: 'Box in Storage',
      message: 'Inactive for over a week',
      avatar: '',
      isRead: false,
      userId: 'user_001',
      boxId: 'box_oo1',
      createdAt: '2025-02-10T15:30:00Z',
      updatedAt: '2025-02-10T15:30:00Z',
    },
    {
      id: '2',
      title: 'Box in Storage',
      message: 'Inactive for over a week',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      isRead: true,
      userId: 'user_002',
      boxId: 'box_oo1',
      createdAt: '2025-02-10T12:15:00Z',
      updatedAt: '2025-02-10T12:15:00Z',
    },
  ];

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id: string, isRead: boolean) => {
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
              maxHeight: 400,
              width: 350,
              padding: 1,
            },
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" px={2} py={1}>
          <Typography variant="h6" fontWeight="bold">
            {t('common.notifications.title')}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={handleCloseMenu}
          >
            {t('common.notifications.seeAll')}
          </Typography>
        </Box>

        {testNotifications && testNotifications.length === 0 ? (
          <MenuItem onClick={handleCloseMenu}>
            <Typography variant="body2">
              {t('common.notifications.noNotifications')}
            </Typography>
          </MenuItem>
        ) : (
          testNotifications.map((notification) => (
            <CustomMenuItem key={notification.id} isRead={notification.isRead}>
              {/* Avatar */}
              <Avatar
                src={notification.avatar || BoxIconSvg}
                alt="box-avatar"
                sx={{ width: 40, height: 40 }}
              />

              {/* Notification Text */}
              <Box flexGrow={1} overflow="hidden">
                {/* Title in bold */}
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {notification.title}
                </Typography>

                {/* Secondary text in normal weight */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {notification.message}
                </Typography>

                {/* Date - how long ago */}
                <Typography variant="caption" color="textSecondary">
                  {formatDistanceToNow(new Date(notification.updatedAt), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>

              {/* Read/Unread Icon with Tooltip */}
              <Tooltip
                title={notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
              >
                <IconButton
                  size="small"
                  onClick={() =>
                    handleMarkAsRead(notification.id, notification.isRead)
                  }
                >
                  {notification.isRead ? (
                    <MarkEmailRead sx={{ fontSize: 18, color: 'gray' }} />
                  ) : (
                    <MarkEmailUnread sx={{ fontSize: 18, color: 'blue' }} />
                  )}
                </IconButton>
              </Tooltip>
            </CustomMenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default CustomNotifications;
