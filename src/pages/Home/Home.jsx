import React from 'react'
import Table from '../../component/Table/Table'
import { Box } from '@mui/material'
import Navbar from '../../component/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box mt={12} mr={3} ml={3}>
        <Table />
      </Box>
    </div>
  )
}

export default Home