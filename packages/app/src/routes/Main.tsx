import * as React from 'react'
import { SearchBar } from '../components/SearchBar'
import { styled } from '@mui/material/styles'

const Container = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const Main: React.FunctionComponent = React.memo(() => {
  return (
    <Container>
      <SearchBar />
    </Container>
  )
})

Main.displayName = 'Main'

export { Main }
