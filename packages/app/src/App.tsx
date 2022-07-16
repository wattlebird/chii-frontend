import React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { About } from './routes/About'
import { Ranking } from './routes/Ranking'
import { Search } from './routes/Search'

function App() {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <Nav />
      <Box sx={{ flex: '1 1 auto' }}>
        <Routes>
          <Route path='/' element={<Ranking />} />
          <Route path='about' element={<About />} />
          <Route path='search' element={<Search />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
