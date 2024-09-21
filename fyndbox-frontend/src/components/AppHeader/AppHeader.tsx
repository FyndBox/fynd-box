import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/FyndBox.png';
import { AppHeaderContainer } from './AppHeader.styles';

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppHeaderContainer>
      <img src={appLogo} alt="Home" height={100} onClick={handleLogoClick} />
    </AppHeaderContainer>
  );
};

export default AppHeader;
