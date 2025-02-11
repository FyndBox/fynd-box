import { FC, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Avatar,
} from '@mui/material';
import { Notifications, FiberManualRecord } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  useMarkNotificationAsRead,
  useNotifications,
} from '../../hooks/useCustomNotification';
import BoxIconSvg from '../../assets/box-icon.svg';
import { formatDistanceToNow } from 'date-fns';
import { CustomNotification } from '../../types/custom-notification';

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
    {
      id: '3',
      title: 'Box in Storage',
      message: 'Inactive for over a week',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      isRead: false,
      userId: 'user_003',
      boxId: 'box_oo1',
      createdAt: '2025-02-09T18:45:00Z',
      updatedAt: '2025-02-09T18:45:00Z',
    },
    {
      id: '4',
      title: 'Box in Storage',
      message: 'Inactive for over a week',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      isRead: true,
      userId: 'user_004',
      boxId: 'box_oo1',
      createdAt: '2025-02-08T10:30:00Z',
      updatedAt: '2025-02-08T10:30:00Z',
    },
    {
      id: '5',
      title: 'Box in Storage',
      message: 'Inactive for over a week',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      isRead: false,
      userId: 'user_005',
      boxId: 'box_oo1',
      createdAt: '2025-02-07T20:15:00Z',
      updatedAt: '2025-02-07T20:15:00Z',
    },
    {
      id: '6',
      title: 'Box in Storage',
      message: 'Inactive for over a week',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      isRead: false,
      userId: 'user_006',
      boxId: 'box_oo1',
      createdAt: '2025-02-06T08:00:00Z',
      updatedAt: '2025-02-06T08:00:00Z',
    },
  ];

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
          testNotifications &&
          testNotifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => {
                handleMarkAsRead(notification.id);
                handleCloseMenu();
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: notification.isRead ? 'white' : '#E8F0FE',
                borderBottom: '1px solid #f0f0f0',
                py: 1.2,
              }}
            >
              <Avatar
                src={notification.avatar || BoxIconSvg}
                alt="box-avatar"
                sx={{ width: 40, height: 40 }}
              />

              <Box flexGrow={1}>
                {/* Title in bold */}
                <Typography variant="body1" fontWeight="bold">
                  {notification.title}
                  &nbsp;
                  {!notification.isRead && (
                    <FiberManualRecord sx={{ fontSize: 12, color: 'blue' }} />
                  )}
                </Typography>

                {/* Secondary text in normal weight */}
                <Typography variant="body2" color="textSecondary">
                  {notification.message}
                </Typography>

                {/* Date - how long ago */}
                <Typography variant="caption" color="textSecondary">
                  {formatDistanceToNow(new Date(notification.updatedAt), {
                    addSuffix: true,
                  })}
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
