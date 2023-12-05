import React from 'react';
import FirstComponent from '../components/FirstComponent';
import SecondComponent from '../components/SecondComponent';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const SecondPage = () => {
  const history = useHistory();

  const data = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
  ];

  const NavigateHome = () => {
    history.push('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Button variant="contained" onClick={NavigateHome}>
        Home
      </Button>
      <FirstComponent />
      <SecondComponent data={data} />
    </div>
  );
};

export default SecondPage;
