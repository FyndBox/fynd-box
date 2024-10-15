import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import { HomeContainer, HomeSubContainer } from './LandingPage.styles';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import appLogo from '../../assets/FyndBox.png';

const LandingPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleUserGuideClick = () => {
    navigate('/userguide');
  };

  return (
    <HomeContainer>
      <HomeSubContainer>
        <Typography variant="h1" mt={10}>
          {t('home.title')}
        </Typography>
        <img src={appLogo} height={200} />
        <Typography variant="body1" mb={4}>
          {t('home.description')}
        </Typography>
        <AuthButtonsGroup
          onLoginClick={handleLoginClick}
          onRegisterClick={handleSignupClick}
        />
        <div>
          <Link
            to="/userguide"
            style={{
              paddingTop: '24px',
              marginBottom: '-35px',
              display: 'inline-block',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'blue'
            }}
          >
            Hur fungerar det?
          </Link>
        </div>
        <LanguageSelector />
      </HomeSubContainer>
    </HomeContainer>
  );
};

export default LandingPage;
