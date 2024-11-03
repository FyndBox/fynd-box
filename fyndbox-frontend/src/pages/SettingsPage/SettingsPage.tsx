import { FC } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import {
  FullPageContainer,
  GoBackButton,
  StyledArrowBack,
} from '../../styles/commonStyles';
import { useTranslation } from 'react-i18next';
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
    switch (section) {
      case 'account':
        return 'Account Settings';
      case 'security':
        return 'Security Settings';
      case 'about':
        return 'About the Company';
      default:
        return 'No Settings Found';
    }
  };

  const renderContent = () => {
    switch (section) {
      case 'account':
        return <AccountSettings />;
      case 'security':
        return (
          <Box>
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary">
              Update Password
            </Button>
          </Box>
        );
      case 'about':
        return (
          <Box>
            <Typography variant="body1" mt={2}>
              Company information goes here.
            </Typography>
          </Box>
        );
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
