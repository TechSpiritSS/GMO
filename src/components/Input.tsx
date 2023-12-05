import React from 'react'
import { Box, TextField } from '@mui/material';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ReactNode;
  error: string;
  maxLength: number
}

const Input = (props: InputProps) => {
  const { Icon, label, value, onChange, error,maxLength } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.5rem',
      }}
    >
      {Icon}
      <TextField
        id="input-with-sx"
        inputProps={{
          maxLength: maxLength 
        }}
        margin='dense'
        label={label}
        variant="standard"
        onChange={onChange}
        value={value}
        error={!!error}
        helperText={error}
      />
    </Box>
  );
};

export default Input;
