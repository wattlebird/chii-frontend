import React, { useEffect } from 'react'
import { useSearchContext } from '../../store/search'
import { Subject, useAdvancedSearchLazyQuery, useScrollLazyQuery } from '../../graphql/index.generated'
import { SearchResultRenderer } from './SearchResultRenderer'
import { SearchState } from '../../Types'

const SearchResultContainer: React.FC = React.memo(() => {
  const [searchResult, setSearchResult] = React.useState<Subject[]>([])
  const [searchState, setSearchState] = React.useState<SearchState>('Init')
  const scrollIdRef = React.useRef('')
  const searchParam = useSearchContext()
  const [getSearchResult, { loading, data, error }] = useAdvancedSearchLazyQuery()
  const [scroll, { loading: scrollLoading, data: appendData, error: scrollError }] = useScrollLazyQuery({
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  })

  const onScroll = React.useCallback(() => {
    if (!scrollIdRef.current) return
    scroll({
      variables: {
        scroll_id: scrollIdRef.current,
      },
    })
  }, [scroll])
  useEffect(() => {
    if (searchParam.q || searchParam.tags) {
      getSearchResult({
        variables: {
          q: searchParam.q,
          tags: searchParam.tags,
          type: searchParam.type,
          dateRange: searchParam.dateRange,
        },
      })
    }
    setSearchState('Init')
    setSearchResult([])
    scrollIdRef.current = ''
  }, [searchParam])
  useEffect(() => {
    if (loading) {
      setSearchState('Searching')
    } else if (error) {
      setSearchState('Error')
    } else if (data?.queryAdvancedSearch?.result.length === 0) {
      setSearchState('Complete')
    } else if (!!data?.queryAdvancedSearch?.result && data?.queryAdvancedSearch?.result.length > 0) {
      setSearchState('ResultAvailable')
      setSearchResult(data?.queryAdvancedSearch?.result ?? [])
      scrollIdRef.current = data?.queryAdvancedSearch?.scroll_id || ''
    }
  }, [loading, data, error])
  useEffect(() => {
    if (scrollLoading) {
      setSearchState('Scrolling')
    } else if (scrollError) {
      setSearchState('Error')
    } else if (appendData?.queryScroll?.result.length === 0) {
      setSearchState('Complete')
    } else if (!!appendData?.queryScroll?.result && appendData?.queryScroll?.result.length > 0) {
      setSearchState('ResultAvailable')
      setSearchResult((prev) => {
        return [...prev, ...(appendData?.queryScroll?.result ?? [])]
      })
    }
  }, [scrollLoading, appendData, scrollError])
  return <SearchResultRenderer state={searchState} searchResult={searchResult} onScroll={onScroll} />
})

SearchResultContainer.displayName = 'SearchResultContainer'

export { SearchResultContainer }
