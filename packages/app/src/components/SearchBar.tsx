import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import NativeSelect from '@mui/material/NativeSelect'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { throttle } from 'lodash'
import { useGetAutoCompleteLazyQuery } from '../graphql/index.generated'
import { useSearchContext } from '../store/search'
import { SubjectType } from '../Types'

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
  flexGrow: 1,
}))

const AutoCompleteWrapper = styled('div')(() => ({
  ml: 1,
  flex: 1,
}))

const StyledInput = styled(InputBase)(() => ({
  width: '100%',
}))

const Listbox = styled('ul')(
  ({ theme }) => `
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
)

const SearchBar: React.FunctionComponent = React.memo(() => {
  const { q, type, updateQuery } = useSearchContext()
  const [options, setOptions] = React.useState<string[]>([])
  const { getRootProps, getInputProps, getListboxProps, getOptionProps, setAnchorEl } = useAutocomplete<
    string,
    false,
    false,
    true
  >({
    id: 'searchbox-autocomplete',
    options: options,
    freeSolo: true,
    getOptionLabel: (option) => option,
  })
  const [getAutoComplete, { loading, data }] = useGetAutoCompleteLazyQuery()
  const throttledGetAutoComplete = React.useCallback(
    throttle((q: string) => getAutoComplete({ variables: { q, fields: 'name' } }), 300, {
      leading: false,
      trailing: true,
    }),
    [getAutoComplete]
  )
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value)
    throttledGetAutoComplete(e.target.value)
  }
  const handleSelect = (value: string) => {
    updateQuery(value)
    setOptions([])
  }
  const handleSwitchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuery(undefined, e.target.value as SubjectType)
  }
  React.useEffect(() => {
    if (!loading) {
      setOptions(data?.queryAutoComplete ?? [])
    }
  }, [loading, data])
  return (
    <StyledSearchBarBox>
      <StyledNativeSelect
        defaultValue={type ?? 'all'}
        inputProps={{
          name: 'search-type',
          id: 'uncontrolled-native',
        }}
        onChange={handleSwitchType}
        value={type}
      >
        <option value='all'>全部</option>
        <option value='anime'>动画</option>
        <option value='book'>书籍</option>
        <option value='music'>音乐</option>
        <option value='game'>游戏</option>
        <option value='real'>三次元</option>
      </StyledNativeSelect>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <AutoCompleteWrapper {...getRootProps()}>
        <StyledInput
          ref={setAnchorEl}
          placeholder='Search'
          inputProps={{ ...getInputProps(), value: q }}
          onChange={handleSearchChange}
        />
        <Listbox {...getListboxProps()}>
          {options.map((option, index) => (
            <li key={option} {...getOptionProps({ option, index })} onClick={handleSelect.bind(this, option)}>
              <span>{option}</span>
            </li>
          ))}
        </Listbox>
      </AutoCompleteWrapper>
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </StyledSearchBarBox>
  )
})

SearchBar.displayName = 'SearchBar'

export { SearchBar }
