import React, { useEffect, useState } from 'react'
import Table from '../../component/TableRekap/Table'
import { Box } from '@mui/material'
import Navbar from '../../component/Navbar/Navbar'
import jsonData from '../../component/TableRekap/data.json'
import jsonDataPemasukan from '../../component/TableRekap/data.json';
import jsonDataPengeluaran from '../../component/TablePengeluaran/data.json';


const Home = () => {
  const [dataPemasukan, setDataPemasukan] = useState(null);
  const [dataPengeluaran, setDataPengeluaran] = useState(null);

  useEffect(() => {
    setDataPemasukan(jsonDataPemasukan);
    setDataPengeluaran(jsonDataPengeluaran);
  }, []);

  return (
    <div>
      <Navbar jsonDataPemasukan={dataPemasukan} jsonDataPengeluaran={dataPengeluaran} />
      <Box sx={{ mx: 4, my: 12 }}>
        <Table jsonData={jsonData} /> 
      </Box>
    </div>
  )
}

export default Home
