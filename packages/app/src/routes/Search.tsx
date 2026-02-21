import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SearchResultContainer } from '../components/searchResult/SearchResultContainer'

const SearchResultBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  [theme.breakpoints.up('lg')]: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
}))

const SearchPage: React.FunctionComponent = React.memo(() => {
  return (
    <SearchResultBox>
      <SearchResultContainer />
    </SearchResultBox>
  )
})

SearchPage.displayName = 'SearchPage'

export { SearchPage }