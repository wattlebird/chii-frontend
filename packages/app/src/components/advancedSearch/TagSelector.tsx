import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { throttle } from 'lodash'
import { useGetAutoCompleteLazyQuery } from '../../graphql/index.generated'

const TagSelector: React.FunctionComponent = React.memo(() => {
  const [tags, setTags] = React.useState<string[]>([])
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
    throttle((q: string) => getAutoComplete({ variables: { q, fields: 'tag' } }), 300, {
      leading: false,
      trailing: true,
    }),
    [getAutoComplete]
  )
  const handleSelect = (val: string) => {
    setTags([...tags, val])
    setAnchorEl(null)
  }
  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }
  React.useEffect(() => {
    setCandidates(query ? data?.queryAutoComplete ?? [] : [])
  }, [query, data])

  return (
    <>
      {tags.length > 0 && (
        <>
          {tags.map((tag) => (
            <Chip label={tag} key={tag} onDelete={handleDeleteTag.bind(this, tag)} />
          ))}
        </>
      )}
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
          <TextField id='tag-input' variant='outlined' value={query} onChange={handleInputChange} />
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
