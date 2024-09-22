import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import { HomeContainer, HomeSubContainer } from './LandingPage.styles';
import { useTranslation } from 'react-i18next';

const LandingPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <HomeContainer>
      <HomeSubContainer>
        <Typography variant="h1" mb={8}>
          {t('home.title')}
        </Typography>
        <Typography variant="body1" mb={10}>
          {t('home.description')}
        </Typography>
        <AuthButtonsGroup
          onLoginClick={handleLoginClick}
          onRegisterClick={handleSignupClick}
        />
      </HomeSubContainer>
    </HomeContainer>
  );
};

export default LandingPage;
