import React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const About = () => {
  return (
    <Paper sx={{ width: '100%' }}>
      <Container maxWidth='lg' component='section'>
        <Typography variant='h3' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
          About
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          Thank you for visiting this site. This site is under construction.
        </Typography>
      </Container>
    </Paper>
  )
}
