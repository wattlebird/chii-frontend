import * as React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { SearchBar } from '../components/advancedSearch'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    marginTop: '12%',
    marginBottom: '20%',
    marginLeft: theme.spacing(10),
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}))

const Background = styled(Box)(({ theme }) => ({
  '& .shape1': {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: theme.palette.primary.main,
    clipPath: 'polygon(1000% 0%,55% 0%,80% 100%,100% 100%)',
    zIndex: -1,
  },
  '& .shape2': {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: theme.palette.primary.light,
    clipPath: 'polygon(100% 0%,75% 0%,45% 100%,100% 100%)',
    opacity: 0.5,
    zIndex: -1,
  },
}))

const SearchBarWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const Main: React.FunctionComponent = React.memo(() => {
  const theme = useTheme()
  const matchDesktop = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <>
      <Container>
        <Typography variant={matchDesktop ? 'h1' : 'h2'} align='center' component='h1' gutterBottom fontWeight={600}>
          再一次，定义搜索
        </Typography>
        <Typography variant='h4' component='h2' align='center' gutterBottom>
          现已推出全新 Bangumi 搜索引擎，从这里开始你的探索
        </Typography>
        <SearchBarWrapper>
          <SearchBar sx={{ flexGrow: 1, maxWidth: 800 }} />
        </SearchBarWrapper>
        <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
          <Button 
            variant='contained' 
            href='/login'
            size={matchDesktop ? 'large' : 'medium'}
          >
            登录
          </Button>
        </Stack>
      </Container>
      <Background>
        <div className='shape1' />
        <div className='shape2' />
      </Background>
    </>
  )
})

Main.displayName = 'Main'

export { Main }
