import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import {
  GuideLink,
  HomeContainer,
  HomeSubContainer,
} from './LandingPage.styles';
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

  const contactUsText = t('settings.about.contactUsText');

  const [beforeEmail, afterEmail] = contactUsText.split('{email}');

  return (
    <HomeContainer>
      <HomeSubContainer>
        <Typography variant="h1" pt={8}>
          {t('home.title')}
        </Typography>
        <img src={appLogo} height={150} />
        <Typography variant="body1" pt={1}>
          {t('home.description')}
        </Typography>
        <AuthButtonsGroup
          onLoginClick={handleLoginClick}
          onRegisterClick={handleSignupClick}
        />
        <Box>
          <GuideLink href="/user-guide" underline="always">
            {t('home.guideLink')}
          </GuideLink>
          <Typography variant="body2" pt={2}>
            {beforeEmail}
            <Link
              href={`mailto:${t('settings.about.email')}`}
              underline="always"
              color="info"
            >
              {t('settings.about.email')}
            </Link>
            {afterEmail}
          </Typography>
        </Box>
        <LanguageSelector />
      </HomeSubContainer>
    </HomeContainer>
  );
};

export default LandingPage;
