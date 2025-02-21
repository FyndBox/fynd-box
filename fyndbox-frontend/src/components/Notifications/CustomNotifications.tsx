import { FC, useState } from 'react';
import { Box, IconButton, MenuItem, Badge, Tooltip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import {
  useMarkNotificationAsRead,
  useNotifications,
} from '../../hooks/useCustomNotification';
import BoxIconSvg from '../../assets/box-icon-black.svg';

import {
  CustomAvatar,
  CustomMenu,
  CustomMenuItem,
  CustomNotificationTitle,
  NoNotificationsText,
  NotificationDate,
  NotificationHeader,
  NotificationMessage,
  NotificationTextWrapper,
  NotificationTitle,
  SeeAllText,
  StyledNotification,
  StyledReadIcon,
  StyledUnreadIcon,
} from './CustomNotifications.styles';

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
          <StyledNotification />
        </Badge>
      </IconButton>
      <CustomMenu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <NotificationHeader>
          <CustomNotificationTitle>
            {t('common.notifications.title')}
          </CustomNotificationTitle>
          <SeeAllText onClick={handleCloseMenu}>
            {t('common.notifications.seeAll')}
          </SeeAllText>
        </NotificationHeader>

        {notifications && notifications.length === 0 ? (
          <MenuItem onClick={handleCloseMenu}>
            <NoNotificationsText>
              {t('common.notifications.noNotifications')}
            </NoNotificationsText>
          </MenuItem>
        ) : (
          notifications &&
          notifications.map((notification) => (
            <CustomMenuItem key={notification.id} isRead={notification.isRead}>
              <CustomAvatar
                src={notification.avatar || BoxIconSvg}
                alt="box-avatar"
              />
              <NotificationTextWrapper>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>
                  {notification.message}
                </NotificationMessage>
                <NotificationDate>
                  {formatDistanceToNow(new Date(notification.updatedAt), {
                    addSuffix: true,
                  })}
                </NotificationDate>
              </NotificationTextWrapper>
              <Tooltip
                title={notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
              >
                <IconButton
                  size="small"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  {notification.isRead ? (
                    <StyledReadIcon />
                  ) : (
                    <StyledUnreadIcon />
                  )}
                </IconButton>
              </Tooltip>
            </CustomMenuItem>
          ))
        )}
      </CustomMenu>
    </Box>
  );
};

export default CustomNotifications;
