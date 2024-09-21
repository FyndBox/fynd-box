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
    <AppHeaderContainer onClick={handleLogoClick}>
      <img src={appLogo} alt="Home" height={100}/>
    </AppHeaderContainer>
  );
};

export default AppHeader;
