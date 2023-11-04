import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import NativeSelect from '@mui/material/NativeSelect'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'

const StyledNativeSelect = styled(NativeSelect)(() => ({
  '&::before': {
    borderBottom: '0px',
  },
}))

const StyledSearchBarBox = styled(Paper)(() => ({
  p: '2px 4px',
  paddingLeft: 25,
  display: 'flex',
  alignItems: 'center',
  maxWidth: 800,
  margin: '0 auto',
  height: 50,
  borderRadius: 25,
  flexGrow: 1,
}))

const SearchInput = styled(InputBase)(() => ({
  ml: 1,
  flex: 1,
}))

const SearchBar: React.FunctionComponent = React.memo(() => {
  return (
    <StyledSearchBarBox>
      <StyledNativeSelect
        defaultValue={30}
        inputProps={{
          name: 'age',
          id: 'uncontrolled-native',
        }}
      >
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </StyledNativeSelect>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <SearchInput placeholder='Search' inputProps={{ 'aria-label': 'search' }} />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </StyledSearchBarBox>
  )
})

SearchBar.displayName = 'SearchBar'

export { SearchBar }
