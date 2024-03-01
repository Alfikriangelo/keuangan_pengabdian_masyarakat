import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../authContext';
import Image from '../../assets/login.png'


export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log('Login berhasil', userData);
        setError(null);
        login();
        navigate('/home');
      } else {
        console.error('Login gagal');
        const errorData = await response.json();
        setError(errorData.error || 'Login gagal. Periksa kembali nama pengguna dan kata sandi.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong during login.');
    }
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: 'relative',
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#E6FEED',
            backgroundSize: '55%', // Ubah sesuai kebutuhan ukuran gambar
            backgroundPosition: 'center',
           
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '14%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#434343',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            Pengolahan Keuangan
          </div>
        </Grid>
        <Grid mt={6} item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" style={{color: '#263237', fontWeight: '600'}}> 
              RT 05 / RW 24
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
                style={{backgroundColor: '#263237'}}
              >
                Masuk
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}