import { FC } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import SecuritySettings from '../../components/SecuritySettings/SecuritySettings';
import AboutUs from '../../components/AboutUs/AboutUs';
import {
  FullPageContainer,
  GoBackButton,
  StyledArrowBack,
} from '../../styles/commonStyles';
import PageHeader from '../../components/PageHeader/PageHeader';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const SettingsPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get('section');

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const getHeading = () => {
    return t(`settings.${section}.title`, 'No Settings Found');
  };

  const renderContent = () => {
    switch (section) {
      case 'account':
        return <AccountSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'about':
        return <AboutUs />;
      default:
        return (
          <Typography variant="h5">
            Please select a setting from the sidebar
          </Typography>
        );
    }
  };

  return (
    <FullPageContainer>
      <GoBackButton onClick={handleBackClick}>
        <StyledArrowBack />
        <Typography variant="h6" component="span" pl={1}>
          {t('userGuide.back')}
        </Typography>
      </GoBackButton>
      <PageHeader heading={getHeading()} />
      {renderContent()}
      <LanguageSelector />
    </FullPageContainer>
  );
};

export default SettingsPage;
