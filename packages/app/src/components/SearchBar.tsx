import React, { useCallback, useEffect, useState, useRef } from 'react'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { visuallyHidden } from '@mui/utils'
import { throttle } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { useGetAutoCompleteLazyQuery } from '../graphql/index.generated'

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  width: '100%',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const Listbox = styled('ul')(({ theme }) => ({
  width: `calc(1em + ${theme.spacing(5)} + 20ch)`,
  margin: `2px 0 0`,
  padding: 0,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: `${theme.palette.mode === 'dark' ? '#141414' : '#fff'}`,
  overflow: 'auto',
  maxHeight: '250px',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '12ch',
  },

  '& li': {
    padding: '5px 12px',
    display: 'flex',

    '& span': {
      flexGrow: 1,
    },

    '& svg': {
      color: 'transparent',
    },
  },

  "& li[aria-selected='true']": {
    backgroundColor: `${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'}`,
    fontWeight: 600,

    '& svg': {
      color: '#1890ff',
    },
  },

  [`& li.focused`]: {
    backgroundColor: `${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'}`,
    cursor: `pointer`,

    '& svg': {
      color: 'currentColor',
    },
  },
}))

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const [getAutoComplete, { data }] = useGetAutoCompleteLazyQuery()
  const navigate = useNavigate()
  const throttledGetAutoComplete = useCallback(
    throttle((q: string) => getAutoComplete({ variables: { q } }), 300, { leading: false, trailing: true }),
    [getAutoComplete]
  )

  const onSearch = () => {
    const keywords = inputValue.split(' ').filter((x) => x)
    if (keywords.length <= 0) return
    const query = keywords.map((str) => encodeURIComponent(str)).join('+')
    return navigate(`/search?q=${query}`)
  }

  const onComboboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, selectionStart } = event.currentTarget
    setInputValue(value)
    if (selectionStart && (selectionStart === value.length || value[selectionStart] === ' ')) {
      let b
      for (b = selectionStart - 1; b >= 0; b--) {
        if (value[b] === ' ') break
      }
      if (b === -1 || value[b] === ' ') b++
      const query = value.substring(b, selectionStart)
      //console.log(value, b, selectionStart, query)
      if (query) throttledGetAutoComplete(query)
    }
  }

  return (
    <div>
      <Search>
        <Box sx={visuallyHidden}>
          <label>标签搜索</label>
        </Box>
        <StyledInputBase
          inputProps={{
            value: inputValue,
            onChange: onComboboxChange,
          }}
          placeholder='Search…'
        />
        <IconButton type='submit' onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Search>
      <Listbox>
        {data?.queryAutoComplete &&
          data.queryAutoComplete.map((option) => (
            <li key={option}>
              <span>{option}</span>
            </li>
          ))}
      </Listbox>
    </div>
  )
}
