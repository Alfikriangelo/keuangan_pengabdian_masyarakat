import React, { useState } from "react";
import Navbar from '../../component/Navbar/Navbar'
import BackButton from '../../component/BackButton/BackButton'
import { Autocomplete, Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

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

const kategori = [
  {label: "Kebersihan"},
  {label: "Keamanan"},
  {label: "Sumbangan"}
]

const penerima = [
  {label: "Bendahara"},
  {label: "Ketua RT"}
]

const status = [
  {label: "Lunas"},
  {label: "Sebagian"},
  {label: "Belum"}
]


const AddData = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [kategoriInputValue, setKategoriInputValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusInputValue, setStatusInputValue] = useState('');
  const [selectedPenerima, setSelectedPenerima] = useState(null)
  const [penerimaInputValue, setPenerimaInputValue] = useState('');
  const [tanggalTerima, setTanggalPenerima] = useState("");
  const [nominal, setNominal] = useState(0);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nama,
      kategori: selectedKategori ? selectedKategori.label : '',
      nominal: parseInt(nominal),
      status: selectedStatus ? selectedStatus.label : '',
      penerima: selectedPenerima ? selectedPenerima.label : '',
      tanggal_terima: tanggalTerima
    };

    try {
      await axios.post('http://localhost:5000/save_data', dataToSend);
      navigate('/home')
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan data. Periksa apakah nama sudah ada');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{marginBottom: 80}}>
        <Navbar />
        <Typography mt={13} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 30, fontWeight:'bold', color: '#337357'}}>
          Tambah Data Keuangan
        </Typography>
        <Box mx={33}>
          <Typography mt={5}style={{ fontSize: 18, fontWeight:'bold', color: '#337357'}}>
            Data Kepala Keluarga
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between'}} >
            <TextField 
              margin="normal"
              label="Nama"
              name="nama"
              autoFocus
              color="green"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
              }}
              sx={{width: 350}}
              />
          </Box>
        </Box>

        <Box mx={33}>
          <Typography mt={5}style={{ fontSize: 18, fontWeight:'bold', color: '#337357'}}>
            Pembayaran
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between'}} >
          <Autocomplete
            disablePortal
            id="kategori"
            options={kategori}
            sx={{ 
                width: 350,
                marginTop: 2,
                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#337357',
                },
                '& .MuiAutocomplete-inputRoot[class*="Mui-focused"] .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#337357',
                },
                '& .MuiInputLabel-root': {
                  color: '#337357', 
                },
            }}
            renderInput={(params) => <TextField {...params} label="Kategori" />}
            value={selectedKategori}
            onChange={(event, newKategori) => {
                setSelectedKategori(newKategori);
            }}
            inputValue={kategoriInputValue}
            onInputChange={(event, newKategoriInputValue) => {
                setKategoriInputValue(newKategoriInputValue);
            }}
          />

          <TextField 
            margin="normal"
            required
            label="Nominal"
            name="nonimal"
            autoFocus
            color="green"
            value={nominal}
            onChange={(e) => {
              setNominal(e.target.value);
            }}
            sx={{width: 350}}
          />
            
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Autocomplete
              disablePortal
              id="penerima"
              options={penerima}
              sx={{ 
                width: 350,
                marginTop: 2,
                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#337357',
                },
                '& .MuiAutocomplete-inputRoot[class*="Mui-focused"] .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#337357',
                },
                '& .MuiInputLabel-root': {
                  color: '#337357', 
                },
              }}
              renderInput={(params) => <TextField {...params} label="Penerima" />}
              value={selectedPenerima}
              onChange={(event, newPenerima) => {
                setSelectedPenerima(newPenerima);
              }}
              inputValue={penerimaInputValue}
              onInputChange={(event, newPenerimaInputValue) => {
                setPenerimaInputValue(newPenerimaInputValue);
              }}
            />
            <input
              type="date"
              name="tanggal_terima"
              value={tanggalTerima}
              onChange={(e) => {
                setTanggalPenerima(e.target.value);
              }}
              style={{
                marginTop: 17,
                height: 35,
                width: 330,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'Roboto, sans-serif',
                color: 'black' 
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#337357';
                e.target.style.transition = 'border-color 0.2s, color 0.2s'; 
              }} 
              onBlur={(e) => {
                e.target.style.borderColor = '#ccc';
              }} 
            />
          </Box>
          <Box>
            <Autocomplete
              disablePortal
              id="status"
              options={status}
              sx={{ 
                width: 350,
                marginTop: 2,
                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#337357',
                },
                '& .MuiAutocomplete-inputRoot[class*="Mui-focused"] .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#337357',
                },
                '& .MuiInputLabel-root': {
                  color: '#337357', 
                },
              }}
              renderInput={(params) => <TextField {...params} label="Status" />}
              value={selectedStatus}
              onChange={(event, newStatus) => {
                setSelectedStatus(newStatus);
              }}
              inputValue={statusInputValue}
              onInputChange={(event, newStatusInputValue) => {
                setStatusInputValue(newStatusInputValue);
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <BackButton />
            <Button variant='contained' style={{textTransform: 'none', color: 'white', marginLeft: 10}} color='green' onClick={handleSubmit}>Kirim</Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
    
  )
}

export default AddData

