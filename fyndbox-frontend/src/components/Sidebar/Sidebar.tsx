import { FC } from 'react';
import { Drawer, Typography } from '@mui/material';
import { AccountCircle, Lock, Info, ChevronRight } from '@mui/icons-material';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import {
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

const Sidebar: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();

  const iconMap: { [key: string]: JSX.Element } = {
    account_circle: <AccountCircle />,
    lock: <Lock />,
    info: <Info />,
  };

  const menuItems = t('sidebar.menuItems', { returnObjects: true }) as Array<{
    text: string;
    icon: string;
  }>;

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <SidebarContainer>
        <Typography variant="h5">
          {t('sidebar.title', { user: 'User' })}
        </Typography>
        <SidebarElementContainer>
          {menuItems.map((item, index) => (
            <LinkElement key={index}>
              <LinkButton
                fullWidth
                onClick={() => console.log(`${item.text} clicked`)}
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
          <DeactivateButton variant="contained" fullWidth>
            {t('sidebar.deactivate')}
          </DeactivateButton>
          <LogoutButton variant="outlined" fullWidth>
            {t('sidebar.logout')}
          </LogoutButton>
        </ButtonsGroupWrapper>
        <LanguageSelector />
      </SidebarContainer>
    </Drawer>
  );
};

export default Sidebar;
