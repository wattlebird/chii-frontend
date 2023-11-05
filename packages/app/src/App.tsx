import React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Nav } from './components/Nav'
import { About } from './routes/About'
import { Ranking } from './routes/Ranking'
import { SearchPage } from './routes/Search'
import { Main } from './routes/Main'

function App() {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column' }}>
      <Nav />
      <Box sx={{ flex: '1 1 auto' }}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='about' element={<About />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='rank' element={<Ranking />} />
          <Route path='tags' element={<Navigate to='/search' replace={true} />} />
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
