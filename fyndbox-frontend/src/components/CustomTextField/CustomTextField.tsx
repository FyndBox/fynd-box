import { FC, ReactNode } from 'react';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      variant="standard"
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
