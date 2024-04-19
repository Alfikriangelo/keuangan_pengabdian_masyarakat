import React, { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/user.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


const red = '#D32F2F';
const white = '#F8FAE5';
const green = '#337357';

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


const settings = ['Keluar'];

function Navbar({jsonDataPemasukan, jsonDataPengeluaran}) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [totalNominal, setTotalNominal] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  useEffect(() => {
    if (jsonDataPemasukan && jsonDataPengeluaran) {
      let totalPemasukan = 0;
      jsonDataPemasukan.forEach((row) => {
        if (row.history) {
          row.history.forEach((entry) => {
            totalPemasukan += entry.nominal;
          });
        }
      });
  
      let totalPengeluaran = 0;
      jsonDataPengeluaran.forEach((row) => {
        totalPengeluaran += row.nominal;
      });
      setTotalPengeluaran(totalPengeluaran);
      setTotalNominal(totalPemasukan);
    }
  }, [jsonDataPemasukan, jsonDataPengeluaran]);

  let totalKasRT = totalNominal - totalPengeluaran;

  const handlePagePengeluaran= () => {
    navigate('/pengeluaran');
  }

  const handlePageRekap= () => {
    navigate('/rekap');
  }

  const handleLogoutClick = () => {
    const isAuthenticated = true; 

    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/rekap');
    }
  };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color='white'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              style={{
                display: { xs: 'none', md: 'flex' },
                color: '#337357',
                textDecoration: 'none',
                fontFamily: 'roboto',
              }}
            >
              Keuangan
            </Typography>

            <Box sx={{ flexGrow: 1, display: {  md: 'flex' } }}>
              
            </Box>
            <Button color='green' variant="text" onClick={handlePagePengeluaran} style={{
                display: { xs: 'none', md: 'flex' },
                color: '#337357',
                textDecoration: 'none',
                fontFamily: 'roboto',
                textTransform: 'none',
                fontSize: 17
              }}>
              Pengeluaran
            </Button>

            <Button color='green' variant="text" sx={{marginX: 5}} onClick={handlePageRekap}style={{
                display: { xs: 'none', md: 'flex' },
                color: '#337357',
                textDecoration: 'none',
                fontFamily: 'roboto',
                textTransform: 'none',
                fontSize: 17
              }}>
              Rekap
            </Button>
            <Typography color={green} marginRight={5}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalKasRT)}</Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  setting === 'Keluar' ? (
                    <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); handleLogoutClick(); }}>
                      <Typography textAlign="center" style={{color: '#D32F2F', marginRight:10, marginLeft: 10}}>{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>  
  );
}
export default Navbar;
