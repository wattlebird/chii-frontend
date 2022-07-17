import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { visuallyHidden } from '@mui/utils'
import { throttle } from 'lodash'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useGetAutoCompleteLazyQuery } from '../graphql/index.generated'

const Search = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  width: '100%',
  padding: '2px',
  cursor: 'pointer',
  '&.focus': {
    border: '2px solid currentcolor',
    borderRadius: '4px',
    padding: 0,
  },
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
  width: `calc(1em + ${theme.spacing(5)} + 20ch + 4px)`,
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
  const [expanded, setExpanded] = useState(false)
  const [combofocus, setCombofocus] = useState(false)
  const [selection, setSelection] = useState<string>('')
  const [getAutoComplete, { loading, error, data }] = useGetAutoCompleteLazyQuery()
  const navigate = useNavigate()
  const throttledGetAutoComplete = useCallback(
    throttle((q: string) => getAutoComplete({ variables: { q } }), 300, { leading: false, trailing: true }),
    [getAutoComplete]
  )
  const hasAutoCompleteData = useMemo(
    () => !!(!loading && !error && data?.queryAutoComplete && data.queryAutoComplete.length > 0),
    [loading, error, data]
  )
  const shouldSuggest = useMemo(
    () => !(inputValue.length === 0 || inputValue[inputValue.length - 1] === ' '),
    [inputValue]
  )
  useEffect(() => {
    if (shouldSuggest && hasAutoCompleteData && !expanded) {
      setExpanded(true)
    } else if ((!shouldSuggest || !hasAutoCompleteData) && expanded) {
      setExpanded(false)
    }
  }, [shouldSuggest, hasAutoCompleteData, expanded])

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

  const onComboboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let flag = false
    switch (event.key) {
      case 'Enter':
        if (!expanded) {
          onSearch()
        }
        flag = true
        break
      case 'Down':
      case 'ArrowDown':
        if (shouldSuggest && hasAutoCompleteData) {
          if (!selection) {
            setSelection(data?.queryAutoComplete?.[0] as string)
          } else {
            const idx = data?.queryAutoComplete?.findIndex((value) => value === selection)
            if (idx !== undefined && idx >= 0 && idx + 1 !== data?.queryAutoComplete?.length) {
              setSelection(data?.queryAutoComplete?.[idx + 1] as string)
            }
          }
        }
        flag = true
        break
      case 'Up':
      case 'ArrowUp':
        if (shouldSuggest && hasAutoCompleteData) {
          if (!selection) {
            setSelection(data?.queryAutoComplete?.[data.queryAutoComplete.length - 1] as string)
          } else {
            const idx = data?.queryAutoComplete?.findIndex((value) => value === selection)
            if (idx !== undefined && idx > 0) {
              setSelection(data?.queryAutoComplete?.[idx - 1] as string)
            }
          }
        }
        flag = true
        break
      default:
    }
    if (flag) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  return (
    <div>
      <Search className={classNames({ focus: combofocus })}>
        <Box sx={visuallyHidden}>
          <label>标签搜索</label>
        </Box>
        <StyledInputBase
          inputProps={{
            value: inputValue,
            onChange: onComboboxChange,
            onKeyDown: onComboboxKeyDown,
          }}
          placeholder='Search…'
        />
        <IconButton type='submit' onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Search>
      <Listbox>
        {shouldSuggest && hasAutoCompleteData &&
          data!.queryAutoComplete!.map((option) => (
            <li
              key={option}
              className={classNames({ focus: option === selection })}
              aria-selected={`${option === selection}`}
            >
              <span>{option}</span>
            </li>
          ))}
      </Listbox>
    </div>
  )
}
