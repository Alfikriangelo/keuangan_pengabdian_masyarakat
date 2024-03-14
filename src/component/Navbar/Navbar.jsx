import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const red = '#A0153E'
const theme = createTheme({
  palette: {
    red: {
      main: red,
    },
  },
});

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const isAuthenticated = true; 

    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/home');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ background: '#337357' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            style={{color: 'white'}}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white'}} >
            RT 05 / RW 24
          </Typography>
          <Button variant="outlined" color="red" sx={{ textTransform: 'none',}} onClick={handleLogoutClick}>
            <Typography color='red'>
              Keluar
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
