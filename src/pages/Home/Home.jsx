import React from 'react'
import Table from '../../component/Table/Table'
import { Box } from '@mui/material'
import Navbar from '../../component/Navbar/Navbar'
import jsonData from '../../component/Table/data.json'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ mx: 4, my: 12 }}>
        <Table jsonData={jsonData} /> 
      </Box>
    </div>
  )
}

export default Home
