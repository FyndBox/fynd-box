import { Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import {  ArrowBack } from '@mui/icons-material';

export const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
    marginLeft: theme.spacing(-0.5),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }));

  export const StyledArrowBack = styled(ArrowBack)(({ theme }) => ({
    color: theme.palette.common.white,
    borderRadius: '50%' ,
    width: '60px',
    height: '60px',
    backgroundColor: theme.palette.primary.main,
    fontSize: 'small'
  }));