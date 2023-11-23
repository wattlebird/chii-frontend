import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SearchBar } from '../components/advancedSearch'

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const Main: React.FunctionComponent = React.memo(() => {
  return (
    <Container>
      <SearchBar simple sx={{ flexGrow: 1, maxWidth: 800 }} />
    </Container>
  )
})

Main.displayName = 'Main'

export { Main }
