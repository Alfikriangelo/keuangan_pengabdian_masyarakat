import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const red = '#A0153E';
const white = '#F8FAE5';
const green = '#337357  ';

const theme = createTheme({
  palette: {
    red: {
      main: red,
    },
    white:{
      main: white,
    },
    green:{
      main: green
    }
  },
});

const BackButtonPengeluaran = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/pengeluaran')
    }
  return (
    <ThemeProvider theme={theme}>
      <Button variant='outlined' style={{textTransform: 'none'}} color='green' onClick={handleBack}>Kembali</Button>
    </ThemeProvider>
  )
}

export default BackButtonPengeluaran