import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <AppBar sx={{ background: 'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            style={{color: '#263237'}}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: '#263237'}} >
            RT 05 / RW 24
          </Typography>
          <Button style={{color: '#B80000', textTransform: 'none' }} onClick={handleLogoutClick}>Keluar</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
