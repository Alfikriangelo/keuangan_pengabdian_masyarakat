import React from 'react'
import Table from '../../component/Table/Table'
import { Box } from '@mui/material'
import Navbar from '../../component/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box mt={10} mr={3}>
        <Table />
      </Box>
    </div>
  )
}

export default Home