import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto'
import { Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';

const red = '#FFCDD2';
const white = '#F8FAE5';
const green = '#337357';


const theme = createTheme({
  palette: {
    red: {
      main: red,
    },
    white: {
      main: white,
    },
    green: {
      main: green,
    },
  },
});



const DoughnutChart = ({ jsonDataPemasukan, jsonDataPengeluaran }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
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
  

  useEffect(() => {
    if(chartInstance.current){
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: [
          'Pemasukan',
          'Pengeluaran',
        ],
        datasets: [{
          data: [totalNominal, totalPengeluaran],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
          ]
      }],
      }
    })
  })

  // const slicedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h4"
        noWrap
        fontWeight="bold"
        marginTop={14}
        marginLeft={5}
        color={green}
        style={{
          textDecoration: 'none',
          fontFamily: 'roboto',
        }}
      >
        Data Pengeluaran
      </Typography>
      <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 300, margin: 'auto', marginTop: 30}}>
        <canvas ref={chartRef} />
      </Box>
      
    </ThemeProvider>
  )
}

export default DoughnutChart