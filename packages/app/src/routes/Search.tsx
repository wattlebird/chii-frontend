import * as React from 'react'
import { SearchBar } from '../components/SearchBar'
import { styled } from '@mui/material/styles'
import { AdvancedSearchBar } from '../components/advancedSearch'

const Container = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

const SearchPage: React.FunctionComponent = React.memo(() => {
  return (
    <Container>
      <SearchBar />
      <AdvancedSearchBar />
    </Container>
  )
})

SearchPage.displayName = 'SearchPage'

export { SearchPage }
