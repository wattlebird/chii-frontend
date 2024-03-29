import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { styled, Theme, SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import _ from 'lodash'
import { TagSelector } from './TagSelector'
import { DateRangePicker } from './DateRange'
import { SimpleSearchBar } from './SearchBar'
import { DateRange } from '../../graphql/index.generated'

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
  const [type, setType] = React.useState<string>('anime')
  const navigate = useNavigate()
  const [tags, setTags] = React.useState<string[]>([])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [searchParams] = useSearchParams()
  const displayAdvanced = React.useMemo(
    () => type !== 'celebrity' && type !== 'person' && type !== 'character' && !simple,
    [type, simple]
  )
  const onSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
  }
  const onSearch = () => {
    const searchParam = []
    if (inputRef.current && inputRef.current.value) {
      searchParam.push(`q=${encodeURIComponent(inputRef.current.value)}`)
    }
    searchParam.push(`type=${type}`)
    if (!simple) {
      if (tags.length > 0) {
        searchParam.push(`tags=${tags.map((str) => encodeURIComponent(str)).join(' ')}`)
      }
      if (dateRange) {
        if (dateRange.lte) searchParam.push(`lte=${dateRange.lte}`)
        if (dateRange.gte) searchParam.push(`gte=${dateRange.gte}`)
      }
    }
    navigate('/search?' + searchParam.join('&'))
  }
  React.useEffect(() => {
    if (searchParams) {
      if (searchParams.has('q') && inputRef.current) {
        inputRef.current.value = decodeURIComponent(searchParams.get('q') ?? '')
      }
      if (searchParams.has('type')) {
        setType(searchParams.get('type') ?? 'anime')
      }
      if (searchParams.has('tags')) {
        setTags(
          searchParams
            .get('tags')
            ?.split(' ')
            ?.map((tag) => decodeURIComponent(tag)) ?? []
        )
      }
      if (searchParams.has('lte') || searchParams.has('gte')) {
        setDateRange(
          _.omitBy(
            {
              lte: searchParams.get('lte'),
              gte: searchParams.get('gte'),
            },
            (item) => _.isNil(item) || _.isEmpty(item)
          )
        )
      }
    }
  }, [searchParams])
  return (
    <Box sx={sx}>
      <SimpleSearchBar
        inputRef={inputRef}
        onSelectType={onSelectType}
        onSearch={onSearch}
        tags={tags}
        type={type}
        setTags={setTags}
      />
      <Container disable={!displayAdvanced}>
        <TagSelector tags={tags} setTags={setTags} />
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </Container>
    </Box>
  )
})

SearchBar.displayName = 'SearchBar'

export { SearchBar }
