import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SearchResultContainer } from '../components/searchResult/SearchResultContainer'
import { RelatedTags } from '../components/RelatedTags'

const SearchResultStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}))

const SearchResultBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginLeft: '219px',
    marginRight: '20%',
  },
}))

const TagBox = styled(Box)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(2),
  },
}))

const SearchPage: React.FunctionComponent = React.memo(() => {
  return (
    <SearchResultBox>
      <SearchResultStack>
        <Box sx={{ flex: 3 }}>
          <SearchResultContainer />
        </Box>
        <TagBox>
          <RelatedTags />
        </TagBox>
      </SearchResultStack>
    </SearchResultBox>
  )
})

SearchPage.displayName = 'SearchPage'

export { SearchPage }
