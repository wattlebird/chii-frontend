import React from 'react'
import Box from '@mui/material/Box'
import { Outlet, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'

const Body = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column',
  minHeight: '100vh',
  height: '100%',
}))

function App() {
  const location = useLocation()
  const hideNavAndFooter = location.pathname === '/login'

  return (
    <Body>
      {!hideNavAndFooter && <Nav />}
      <Box sx={{ flex: '1 1 auto' }}>
        <Outlet />
      </Box>
      {!hideNavAndFooter && <Footer />}
    </Body>
  )
}

export default App
