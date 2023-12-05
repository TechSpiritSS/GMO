import React, { useState } from 'react';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import {
  AccountCircle,
  PhoneCallbackRounded,
  MailRounded,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Home: React.FC = () => {
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      setNameError('Name must be at least 3 characters.');
    } else {
      setNameError('');
    }

    setUserName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }

    setEmail(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // validate number
    const numberRegex = /^(\+\d+|\d+)$/;
    if (!numberRegex.test(e.target.value)) {
      setNumberError('Please enter a valid number.');
    } else {
      setNumberError('');
    }

    setNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      userName &&
      email &&
      number &&
      !nameError &&
      !emailError &&
      !numberError
    ) {
      // Save user details to localStorage
      const userDetails = {
        userName,
        email,
        number,
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      // Redirect to the second page
      toast.success('Data submitted');
      history.push('/second-page');
    } else if (nameError || emailError || numberError) {
      toast.error('Fill all the details correctly');
    } else {
      toast.error('Fill all the fields');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Enter your details</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Input
          Icon={<AccountCircle />}
          label="Name"
          value={userName}
          onChange={handleUserNameChange}
          error={nameError}
          maxLength={50}
        />
        <Input
          Icon={<MailRounded />}
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          maxLength={50}
        />
        <Input
          Icon={<PhoneCallbackRounded />}
          label="Phone Number"
          value={number}
          onChange={handleNumberChange}
          error={numberError}
          maxLength={14}
        />
        <Button
          sx={{
            marginTop: '1rem',
            width: '100px',
            height: '40px',
            backgroundColor: '#f50057',
            color: '#fff',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            outline: 'none',
            border: 'none',
            '&:hover': {
              backgroundColor: '#f50057',
              opacity: '0.8',
            },
          }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Home;
