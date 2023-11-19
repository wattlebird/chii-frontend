import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FooterContainer = styled(Box)(({ theme }) => ({
  background: '#f2f2f2',
  width: '100%',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typography>©Genius、小乖, all rights reserved, 2016-2023</Typography>
    </FooterContainer>
  )
}
