import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
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
          <Button style={{color: '#B80000', textTransform: 'none' }}>Keluar</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
