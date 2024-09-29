import { styled, Typography } from '@mui/material';

export const StyledHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  alignSelf: 'flex-start',
}));
