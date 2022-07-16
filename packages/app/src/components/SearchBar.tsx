import React, { useCallback, useEffect, useState, useRef } from 'react'
import { styled, alpha } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled'
import { visuallyHidden } from '@mui/utils'
import { useNavigate } from 'react-router-dom'
import { useGetAutoCompleteQuery } from '../graphql/index.generated'

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

  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: `${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'}`,
    cursor: `pointer`,

    '& svg': {
      color: 'currentColor',
    },
  },
}))

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')
  const token = useRef(false)
  useEffect(() => {
    if (!token.current) {
      token.current = true
      setTimeout(() => {
        const keywords = inputValue.split(' ')
        const query = keywords[keywords.length - 1]
        setQuery(query)
        token.current = false
      }, 300)
    }
  }, [inputValue])
  const { data } = useGetAutoCompleteQuery({
    variables: { q: query },
  })
  const { getRootProps, getInputLabelProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      id: 'search-bar',
      multiple: true,
      freeSolo: false,
      includeInputInList: true,
      filterSelectedOptions: true,
      options: data?.queryAutoComplete ?? [],
      filterOptions: (x) => x,
      getOptionLabel: (option) => option,
      onInputChange: (event, newInputValue) => {
        setInputValue(newInputValue)
      },
      onChange: (event: any, newValue) => {
        //if (newValue.length > 0) {
        //  const nxtValue = inputValue.split(' ').filter((x) => x)
        //  nxtValue.splice(nxtValue.length - 1, 1)
        //  nxtValue.push(newValue[newValue.length - 1])
        //  setInputValue(nxtValue.join(' ') + ' ')
        //} else {
        //  setInputValue('')
        //}
        setInputValue(newValue.length > 0 ? newValue.join(' ') + ' ' : '')
      },
    })
  const navigate = useNavigate()

  const onSearch = () => {
    const keywords = inputValue.split(' ').filter((x) => x)
    if (keywords.length <= 0) return
    const query = keywords.map((str) => encodeURIComponent(str)).join('+')
    return navigate(`/search?q=${query}`)
  }

  return (
    <div>
      <Search {...getRootProps()}>
        <Box sx={visuallyHidden}>
          <label {...getInputLabelProps()}>标签搜索</label>
        </Box>
        <StyledInputBase
          inputProps={{
            ...getInputProps(),
            value: inputValue,
            onKeyDown: (event) => {
              if (event.key === 'Enter') {
                onSearch()
              }
            },
          }}
          placeholder='Search…'
        />
        <IconButton type='submit' onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Search>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as string[]).map((option, index) => (
            <li {...getOptionProps({ option, index })} key={option}>
              <span>{option}</span>
              <CheckIcon fontSize='small' />
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  )
}
