import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

const FooterContainer = styled(Box)(({ theme }) => ({
  background: '#f2f2f2',
  width: '100%',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  padding: `0 ${theme.spacing(4)}`,
}))

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Link component={RouterLink} to='/about' underline='none' color='text.primary'>
        <Typography>关于</Typography>
      </Link>
      <Typography sx={{ marginLeft: 'auto' }}>
        ©@wattlebird, all rights reserved, 2016-{new Date().getFullYear()}
      </Typography>
    </FooterContainer>
  )
}
