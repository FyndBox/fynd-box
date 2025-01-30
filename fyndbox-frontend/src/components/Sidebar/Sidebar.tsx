import { FC, useState } from 'react';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import {
  AccountCircle,
  Info,
  ChevronRight,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import {
  AvatarContainer,
  DeactivateButton,
  IconButtonContainer,
  LinkButton,
  LinkElement,
  LogoutButton,
  SidebarContainer,
  SidebarElementContainer,
} from './Sidebar.styles';
import { ButtonsGroupWrapper } from '../../styles/commonStyles';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useDeactivateUser, useUser } from '../../hooks/useUser';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const Sidebar: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

  const { logout } = useAuth();
  const { data: user } = useUser();
  const { mutateAsync: deactivateUser } = useDeactivateUser();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleCloseDeactivateDialog = () => {
    setDeactivateDialogOpen(false);
  };

  const handleDeactivate = async () => {
    try {
      await deactivateUser();
      logout();
      setDeactivateDialogOpen(false);
      onClose();
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleOpenDeactivateDialog = () => {
    setDeactivateDialogOpen(true);
  };

  const handleNavigation = (section: string) => {
    navigate(`/settings?section=${section}`);
    onClose();
  };

  const getUserInitials = (name: string | undefined) => {
    if (!name) return '';
    const [firstName, lastName] = name.split(' ');
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getDisplayName = (name: string) => {
    const [firstName, lastName] = name.split(' ');
    return lastName ? lastName : firstName;
  };

  const iconMap: { [key: string]: JSX.Element } = {
    account_circle: <AccountCircle />,
    security: <Security />,
    info: <Info />,
  };

  const menuItems = t('sidebar.menuItems', { returnObjects: true }) as Array<{
    text: string;
    icon: string;
    section: string;
  }>;

  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box display="flex" alignItems="center" p={2}>
          <AvatarContainer src={user?.image || ''} alt={user?.name}>
            {!user?.image && getUserInitials(user?.name!)}
          </AvatarContainer>
          <Typography variant="h4">
            {t('sidebar.title', {
              user: user && getDisplayName(user.name),
            })}
          </Typography>
        </Box>
        <Divider orientation="horizontal" />
        <SidebarContainer>
          <SidebarElementContainer>
            {menuItems.map((item, index) => (
              <LinkElement key={index}>
                <LinkButton
                  fullWidth
                  onClick={() => handleNavigation(item.section)}
                >
                  <IconButtonContainer>
                    {iconMap[item.icon]}
                    <Typography variant="body1" ml={2}>
                      {item.text}
                    </Typography>
                  </IconButtonContainer>
                  <ChevronRight />
                </LinkButton>
              </LinkElement>
            ))}
          </SidebarElementContainer>
          <ButtonsGroupWrapper>
            <DeactivateButton
              variant="contained"
              onClick={handleOpenDeactivateDialog}
            >
              {t('sidebar.deactivate')}
            </DeactivateButton>
            <LogoutButton variant="outlined" onClick={handleLogout} fullWidth>
              {t('sidebar.logout')}
            </LogoutButton>
          </ButtonsGroupWrapper>
          <LanguageSelector />
        </SidebarContainer>
      </Drawer>
      <ConfirmationDialog
        isOpen={isDeactivateDialogOpen}
        titleKey="modal.deactivateTitle"
        messageKey="modal.deactivateConfirmation"
        confirmButtonTextKey="modal.deactivate"
        onConfirm={handleDeactivate}
        onCancel={handleCloseDeactivateDialog}
      />
    </>
  );
};

export default Sidebar;
