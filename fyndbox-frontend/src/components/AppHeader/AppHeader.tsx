import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import appLogo from '../../assets/FyndBox.png';
import { AppHeaderBox, AppHeaderContainer } from './AppHeader.styles';

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppHeaderContainer>
      <AppHeaderBox>
        <IconButton onClick={handleLogoClick}>
          <img src={appLogo} alt="Home" height={70} />
        </IconButton>
      </AppHeaderBox>
    </AppHeaderContainer>
  );
};

export default AppHeader;
