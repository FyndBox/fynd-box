import { FC } from 'react';
import { Toolbar, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import appLogo from '../../assets/FyndBox.png';
import { AppbarContainer, AppHeaderContainer } from './AppHeader.styles';

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppbarContainer position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit">
            <AppHeaderContainer>
              <img
                src={appLogo}
                alt="Home"
                height={70}
                onClick={handleLogoClick}
              />
            </AppHeaderContainer>
          </IconButton>
        </Box>

        <LanguageSelector />
      </Toolbar>
    </AppbarContainer>
  );
};

export default AppHeader;
