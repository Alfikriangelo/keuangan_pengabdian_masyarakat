import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton 
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> 
          <TableCell component="th" scope="row">
            {row.noRumah}
          </TableCell>                                                                                
          <TableCell component="th" scope="row">
            {row.nama}
          </TableCell>
          <TableCell align="left">
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: row.keamanan === 'Lunas' ? '#C8E6C9' : row.keamanan === 'Sebagian' ? '#FFF9C4' : row.keamanan === 'Belum' ? '#FFCDD2' : 'transparent',
                padding: '4px 8px',
                borderRadius: '4px',
                color: row.keamanan === 'Lunas' ? '#337357' : row.keamanan === 'Sebagian' ? '#F57F17' : row.keamanan === 'Belum' ? '#D32F2F' : 'inherit',
              }}
            >
              {row.keamanan}
            </Box>
          </TableCell>
          <TableCell align="left">
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: row.kebersihan === 'Lunas' ? '#C8E6C9' : row.kebersihan === 'Sebagian' ? '#FFF9C4' : row.kebersihan === 'Belum' ? '#FFCDD2' : 'transparent',
                padding: '4px 8px',
                borderRadius: '4px',
                color: row.kebersihan === 'Lunas' ? '#337357' : row.kebersihan === 'Sebagian' ? '#F57F17' : row.kebersihan === 'Belum' ? '#D32F2F' : 'inherit',
              }}
            >
              {row.kebersihan}
            </Box>
          </TableCell>
          <TableCell align="left">
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: row.pbb === 'Lunas' ? '#C8E6C9' : row.pbb === 'Sebagian' ? '#FFF9C4' : row.pbb === 'Belum' ? '#FFCDD2' : 'transparent',
                padding: '4px 8px',
                borderRadius: '4px',
                color: row.pbb === 'Lunas' ? '#337357' : row.pbb === 'Sebagian' ? '#F57F17' : row.pbb === 'Belum' ? '#D32F2F' : 'inherit',
              }}
            >
              {row.pbb}
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Histori
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Penerima</TableCell>
                      <TableCell align="right">Kategori</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.tanggal}>
                        <TableCell component="th" scope="row">
                          {historyRow.tanggal}
                        </TableCell>
                        <TableCell>{historyRow.penerima}</TableCell>
                        <TableCell align="right">{historyRow.kategori}</TableCell>
                        <TableCell align="right">
                          {historyRow.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    keamanan: PropTypes.string.isRequired,
    pbb: PropTypes.string.isRequired,
    kebersihan: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        kategori: PropTypes.string.isRequired,
        penerima: PropTypes.string.isRequired,
        tanggal: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ).isRequired,
    nama: PropTypes.string.isRequired,
  }).isRequired,
};

export default function table({ jsonData }) {
  return (
      <ThemeProvider theme={theme}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div></div>
          <Button variant="outlined" style={{textTransform: 'none'}} color='green' >Tambah</Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead style={{backgroundColor: '#337357'}}>
              <TableRow>
                <TableCell />
                <TableCell style={{color: 'white'}}>No Rumah</TableCell>
                <TableCell style={{color: 'white'}}>Nama</TableCell>
                <TableCell style={{color: 'white'}}>Keamanan</TableCell>
                <TableCell style={{color: 'white'}}>Kebersihan</TableCell>
                <TableCell style={{color: 'white'}}>PBB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jsonData.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </ThemeProvider> 
  );
}
