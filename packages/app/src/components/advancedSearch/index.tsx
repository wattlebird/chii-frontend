import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { styled, Theme, SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { TagSelector } from './TagSelector'
import { DateRangePicker } from './DateRange'
import { SimpleSearchBar } from './SearchBar'
import { DateRange } from '../../graphql/index.generated'
import { useSearchContext } from '../../store/search'
import { SubjectType } from '../../Types'

interface ISearchBarProps {
  simple?: boolean
  sx?: SxProps<Theme>
}

const Container = styled('div')<{ disable: boolean }>(({ disable, theme }) => ({
  width: '100%',
  display: disable ? 'none' : 'flex',
  alignItems: 'baseline',
  marginTop: theme.spacing(1),
}))

const SearchBar: React.FunctionComponent<ISearchBarProps> = React.memo<ISearchBarProps>(({ simple, sx }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const selectRef = React.useRef<HTMLSelectElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [tags, setTags] = React.useState<string[]>([])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const {
    updateQuery,
    updateType,
    updateTags,
    updateDateRange,
    q,
    type,
    tags: originalTags,
    dateRange: originalDateRange,
  } = useSearchContext()
  React.useEffect(() => {
    if ((q || (originalTags && originalTags.length > 0)) && location.pathname != '/search') {
      navigate('/search')
    }
  }, [q, type, originalTags, originalDateRange])
  const onSearch = () => {
    if (inputRef.current) {
      updateQuery(inputRef.current.value)
    }
    if (selectRef.current) {
      updateType(selectRef.current.value as SubjectType)
    }
    if (!simple) {
      if (tags.length > 0) {
        updateTags(tags)
      }
      if (dateRange) {
        updateDateRange(dateRange)
      }
    }
  }
  return (
    <Box sx={sx}>
      <SimpleSearchBar inputRef={inputRef} selectRef={selectRef} onSearch={onSearch} tags={tags} setTags={setTags} />
      <Container disable={!!simple}>
        <TagSelector tags={tags} setTags={setTags} />
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </Container>
    </Box>
  )
})

SearchBar.displayName = 'SearchBar'

export { SearchBar }
