import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import { styled } from '@mui/material/styles'
import { throttle } from 'lodash'
import { useGetAutoCompleteLazyQuery } from '../../graphql/index.generated'

interface ITagSelectorProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

const TagInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    border: '2px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#E6EDF5',
  },
  '& .MuiInputBase-input:focus': {
    borderColor: theme.palette.mode === 'light' ? '#525355' : '#E6EDF5',
  },
}))

const TagSelector: React.FunctionComponent<ITagSelectorProps> = React.memo(({ tags, setTags }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [query, setQuery] = React.useState<string>('')
  const [candidates, setCandidates] = React.useState<string[]>([])
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuery('')
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    throttledGetAutoComplete(event.target.value)
  }
  const handleAdd = () => {
    setTags([...tags, query])
    setAnchorEl(null)
  }
  const [getAutoComplete, { data }] = useGetAutoCompleteLazyQuery()
  const throttledGetAutoComplete = React.useCallback(
    throttle((q: string) => getAutoComplete({ variables: { q, type: 'subject', fields: 'tag' } }), 300, {
      leading: false,
      trailing: true,
    }),
    [getAutoComplete]
  )
  const handleSelect = (val: string) => {
    setTags([...tags, val])
    setAnchorEl(null)
  }
  React.useEffect(() => {
    setCandidates(query ? data?.queryAutoComplete ?? [] : [])
  }, [query, data])

  return (
    <>
      <Button
        variant='text'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        添加标签
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <TagInput id='tag-input' value={query} onChange={handleInputChange} />
        </MenuItem>
        {candidates.map((can) => (
          <MenuItem key={can} onClick={handleSelect.bind(this, can)}>
            {can}
          </MenuItem>
        ))}
        {!!query && (
          <MenuItem onClick={handleAdd} key={`add_${query}`}>
            添加：{query}
          </MenuItem>
        )}
      </Menu>
    </>
  )
})

TagSelector.displayName = 'TagSelector'

export { TagSelector }
