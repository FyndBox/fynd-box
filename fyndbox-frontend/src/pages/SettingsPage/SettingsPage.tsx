import { FC } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import SecuritySettings from '../../components/SecuritySettings/SecuritySettings';

const SettingsPage: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get('section');

  const renderContent = () => {
    switch (section) {
      case 'account':
        return <AccountSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'about':
        return (
          <Box>
            <Typography variant="h5">About the Company</Typography>
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

  return <Box p={3}>{renderContent()}</Box>;
};

export default SettingsPage;
