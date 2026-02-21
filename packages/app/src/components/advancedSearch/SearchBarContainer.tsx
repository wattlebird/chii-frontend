import * as React from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Theme, SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { omitBy, isNil, isEmpty, startsWith } from 'lodash'
import { SearchBarRenderer } from './SearchBarRenderer'
import { CelebritySortBy, SubjectSortBy, useGetAutoCompleteLazyQuery } from '../../graphql/index.generated'
import { throttle } from 'lodash'
import { SearchOptionsContext, ISearchOptionsContext } from '../../store/searchParams'
import { isCelebrityCategory } from '../../hooks/Utils'

interface ISearchBarContainerProps {
  sx?: SxProps<Theme>
  compact?: boolean
}

const SearchBarContainer: React.FunctionComponent<ISearchBarContainerProps> = React.memo<ISearchBarContainerProps>(
  ({ sx, compact = false }) => {
    const navigate = useNavigate()
    const {
      query,
      tags,
      category,
      dateRange,
      subSortBy,
      celebSortBy,
      rankRange,
      customRankRange,
      scoreRange,
      setQuery,
      setTags,
      setCategory,
      setDateRange,
      setSubSortBy,
      setCelebSortBy,
      setRankRange,
      setCustomRankRange,
      setScoreRange,
      clearSearchOptions,
    } = React.useContext<ISearchOptionsContext>(SearchOptionsContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const { pathname } = useLocation()
    const [getAutoCompleteQuery, { loading: loadingQuery, data: candidateQueries }] = useGetAutoCompleteLazyQuery()
    const [getAutoCompleteTags, { loading: loadingTags, data: candidateTags }] = useGetAutoCompleteLazyQuery()
    const throttledGetAutoCompleteQuery = React.useCallback(
      throttle((q: string) => getAutoCompleteQuery({ variables: { q, type: category, fields: 'name' } }), 300, {
        leading: false,
        trailing: true,
      }),
      [getAutoCompleteQuery, category]
    )
    const throttledGetAutoCompleteTags = React.useCallback(
      throttle((q: string) => getAutoCompleteTags({ variables: { q, type: category, fields: 'tag' } }), 300, {
        leading: false,
        trailing: true,
      }),
      [getAutoCompleteTags, category]
    )

    const onAddTag = (tag: string) => {
      setTags([...tags, tag])
    }
    const onRemoveTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag))
    }

    const onSearch = React.useCallback((intended: boolean = false) => {
      if (intended || pathname.startsWith("/search")) {
        const searchParam = []
        searchParam.push(`type=${category}`)
        if (query) {
          searchParam.push(`q=${encodeURIComponent(query)}`)
        }
        if (tags.length > 0) {
          searchParam.push(`tags=${tags.map((str) => encodeURIComponent(str)).join(' ')}`)
        }
        if (dateRange) {
          if (dateRange.lte) searchParam.push(`lte=${dateRange.lte}`)
          if (dateRange.gte) searchParam.push(`gte=${dateRange.gte}`)
        }
        if (isCelebrityCategory(category)) {
          if (celebSortBy !== CelebritySortBy.Default) {
            searchParam.push(`sortBy=${celebSortBy}`)
          }
        } else if (subSortBy !== SubjectSortBy.Default) {
          searchParam.push(`sortBy=${subSortBy}`)
        }
        if (rankRange) {
          if (rankRange.lte) searchParam.push(`rlte=${rankRange.lte}`)
          if (rankRange.gte) searchParam.push(`rgte=${rankRange.gte}`)
        }
        if (customRankRange) {
          if (customRankRange.lte) searchParam.push(`clte=${customRankRange.lte}`)
          if (customRankRange.gte) searchParam.push(`cgte=${customRankRange.gte}`)
        }
        if (scoreRange) {
          if (scoreRange.lte) searchParam.push(`slte=${scoreRange.lte}`)
          if (scoreRange.gte) searchParam.push(`sgte=${scoreRange.gte}`)
        }
        navigate('/search?' + searchParam.join('&'))
      }
    }, [pathname, query, tags, dateRange, category, subSortBy, celebSortBy, rankRange, customRankRange, scoreRange, navigate])


    React.useEffect(() => {
      return () => {
        clearSearchOptions()
        setSearchParams()
      }
    }, [])
    
    // React on url params
    React.useEffect(() => {
      if (searchParams) {
        let cat = 'anime'
        if (searchParams.has('q')) {
          setQuery(searchParams.get('q') ?? '')
        }
        if (searchParams.has('type')) {
          cat = searchParams.get('type') ?? 'anime'
          setCategory(cat)
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
            omitBy(
              {
                lte: searchParams.get('lte'),
                gte: searchParams.get('gte'),
              },
              (item) => isNil(item) || isEmpty(item)
            )
          )
        }
        if (searchParams.has('rlte') || searchParams.has('rgte')) {
          setRankRange(
            omitBy(
              {
                lte: Number(searchParams.get('rlte')),
                gte: Number(searchParams.get('rgte')),
              },
              (item) => isNil(item)
            )
          )
        }
        if (searchParams.has('clte') || searchParams.has('cgte')) {
          setCustomRankRange(
            omitBy(
              {
                lte: Number(searchParams.get('clte')),
                gte: Number(searchParams.get('cgte')),
              },
              (item) => isNil(item)
            )
          )
        }
        if (searchParams.has('slte') || searchParams.has('sgte')) {
          setScoreRange(
            omitBy(
              {
                lte: Number(searchParams.get('slte')),
                gte: Number(searchParams.get('sgte')),
              },
              (item) => isNil(item)
            )
          )
        }
        if (searchParams.has('sortBy') && searchParams.get('sortBy') !== 'Default') {
          if (isCelebrityCategory(category)) {
            setCelebSortBy(searchParams.get('sortBy') as CelebritySortBy)
          } else {
            setSubSortBy(searchParams.get('sortBy') as SubjectSortBy)
          }
        }
      }
    }, [searchParams])

    // React on query change
    React.useEffect(() => {
      if (query || tags.length > 0) {
        onSearch()
      }
    }, [query, tags, category, dateRange, subSortBy, celebSortBy, rankRange, customRankRange, scoreRange, onSearch])


    return (
      <Box sx={sx}>
        <SearchBarRenderer
          onSearch={onSearch}
          getAutoCompleteQuery={throttledGetAutoCompleteQuery}
          getAutoCompleteTags={throttledGetAutoCompleteTags}
          loadingCandidates={isCelebrityCategory(category) ? loadingQuery : loadingQuery || loadingTags}
          candidateQueries={candidateQueries?.queryAutoComplete || undefined}
          candidateTags={candidateTags?.queryAutoComplete || undefined}
          addTag={onAddTag}
          removeTag={onRemoveTag}
          compact={compact}
        />
      </Box>
    )
  }
)

SearchBarContainer.displayName = 'SearchBarContainer'

export { SearchBarContainer }
