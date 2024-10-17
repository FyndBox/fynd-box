import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import { GuideLink, HomeContainer, HomeSubContainer } from './LandingPage.styles';
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
        <Box>
          <GuideLink
            href="/user-guide"
            underline='always'
        >
            {t('home.guideLink')}
          </GuideLink>
        </Box>
        <LanguageSelector />
      </HomeSubContainer>
    </HomeContainer>
  );
};

export default LandingPage;
