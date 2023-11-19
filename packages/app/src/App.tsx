import React from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import { Nav } from './components/Nav'

import { Footer } from './components/Footer'

function App() {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', minHeight: '100vh', height: '100%' }}>
      <Nav />
      <Box sx={{ flex: '1 1 auto' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
