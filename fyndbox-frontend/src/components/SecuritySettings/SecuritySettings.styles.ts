import { Box, styled } from '@mui/material';


export const SecuritySettingsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  }));