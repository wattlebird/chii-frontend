import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import NativeSelect from '@mui/material/NativeSelect'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import classNames from 'classnames'
import { throttle } from 'lodash'
import { useGetAutoCompleteLazyQuery } from '../../graphql/index.generated'

interface ISimpleSearchBarProps {
  tags: string[]
  type: string
  inputRef: React.RefObject<HTMLInputElement>
  onSelectType: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onSearch: () => void
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

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
  height: 50,
  borderRadius: 25,
}))

const SearchBox = styled(Box)(() => ({
  flex: '1 1 auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
}))

const StyledInput = styled(InputBase)(() => ({
  width: '100%',
}))

const Listbox = styled('ul')<{ expand: boolean }>(({ theme, expand }) => ({
  display: expand ? 'block' : 'none',
  width: '100%',
  margin: `2px 0 0`,
  padding: 0,
  position: 'absolute',
  top: '32px',
  listStyle: 'none',
  backgroundColor: `${theme.palette.mode === 'dark' ? '#141414' : '#fff'}`,
  overflow: 'auto',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 1,

  '&.focus': {
    border: '2px solid currentcolor',
    borderRadius: '4px',
    padding: 0,
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

  [`& li.focused, & li:hover, & li[aria-selected='true']`]: {
    backgroundColor: `${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'}`,
    cursor: `pointer`,

    '& svg': {
      color: 'currentColor',
    },
  },
}))

const SearchBar: React.FunctionComponent<ISimpleSearchBarProps> = React.memo(
  ({ tags, type, inputRef, onSelectType, onSearch, setTags }) => {
    const [options, setOptions] = React.useState<string[]>([])
    const [expand, setExpand] = React.useState(false)
    const [selection, setSelection] = React.useState<string>('')
    const [getAutoComplete, { loading, data }] = useGetAutoCompleteLazyQuery()
    const throttledGetAutoComplete = React.useCallback(
      throttle((q: string) => getAutoComplete({ variables: { q, type, fields: 'name' } }), 300, {
        leading: false,
        trailing: true,
      }),
      [getAutoComplete, type]
    )
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      throttledGetAutoComplete(e.target.value)
    }
    const handleSelect = (value: string) => {
      if (inputRef.current) {
        inputRef.current.value = value
      }
      setSelection(value)
      setExpand(false)
    }
    const onComboboxFocus = () => {
      setExpand(true)
    }
    const onComboboxBlur = () => {
      setTimeout(() => setExpand(false), 300)
    }
    const handleDeleteTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag))
    }
    const onComboboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      let flag = false
      const { value } = event.currentTarget
      switch (event.key) {
        case 'Enter':
          if (!expand) {
            onSearch()
            inputRef.current?.blur()
          } else if (selection) {
            if (inputRef.current) {
              inputRef.current.value = selection
              inputRef.current.focus()
            }
          }
          setExpand(false)
          setSelection('')
          flag = true
          break
        case 'Down':
        case 'ArrowDown':
          if (!loading && data?.queryAutoComplete) {
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
          if (!loading && data?.queryAutoComplete) {
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
        case 'Esc':
        case 'Escape':
          if (expand) {
            setExpand(false)
          } else if (value) {
            inputRef.current.value = ''
          }
          setSelection('')
          flag = true
          break
        default:
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    React.useEffect(() => {
      if (!loading) {
        setOptions(data?.queryAutoComplete ?? [])
      }
    }, [loading, data])
    return (
      <StyledSearchBarBox>
        <StyledNativeSelect
          value={type}
          onChange={onSelectType}
          inputProps={{
            name: 'search-type',
          }}
        >
          <option value='subject'>条目</option>
          <option value='anime'>- 动画</option>
          <option value='book'>- 书籍</option>
          <option value='music'>- 音乐</option>
          <option value='game'>- 游戏</option>
          <option value='real'>- 三次元</option>
          <option value='celebrity'>人物</option>
          <option value='person'>- 现实人物</option>
          <option value='character'>- 虚拟人物</option>
        </StyledNativeSelect>
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <SearchBox>
          {tags.length > 0 && (
            <>
              {tags.map((tag) => (
                <Chip label={tag} key={tag} onDelete={handleDeleteTag.bind(this, tag)} />
              ))}
            </>
          )}
          <StyledInput
            placeholder='Search'
            onChange={handleSearchChange}
            inputProps={{
              ref: inputRef,
              onKeyDown: onComboboxKeyDown,
              onFocus: onComboboxFocus,
              onBlur: onComboboxBlur,
            }}
          />
          <Listbox expand={expand}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={classNames({ focus: option === selection })}
                aria-selected={`${option === selection}`}
              >
                <span>{option}</span>
              </li>
            ))}
          </Listbox>
        </SearchBox>
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </StyledSearchBarBox>
    )
  }
)

SearchBar.displayName = 'SimpleSearchBar'

export { SearchBar as SimpleSearchBar }
