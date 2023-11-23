import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Subject, useAdvancedSearchLazyQuery, useScrollLazyQuery } from '../../graphql/index.generated'
import { SearchResultRenderer } from './SearchResultRenderer'
import { SearchState } from '../../Types'
import _ from 'lodash'

const SearchResultContainer: React.FC = React.memo(() => {
  const [searchResult, setSearchResult] = React.useState<Subject[]>([])
  const [searchState, setSearchState] = React.useState<SearchState>('Init')
  const scrollIdRef = React.useRef('')
  const [searchParams] = useSearchParams()
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
    if (searchParams) {
      const variables = _.omitBy(
        {
          dateRange: _.omitBy(
            {
              lte: searchParams.get('lte'),
              gte: searchParams.get('gte'),
            },
            (item) => _.isNil(item) || _.isEmpty(item)
          ),
          q: searchParams.has('q') ? decodeURIComponent(searchParams.get('q') ?? '') : undefined,
          tags: searchParams
            .get('tags')
            ?.split(' ')
            ?.map((tag) => decodeURIComponent(tag)),
          type: searchParams.get('type'),
        },
        (item) => _.isNil(item) || _.isEmpty(item)
      )
      if (!_.isEmpty(variables)) {
        getSearchResult({
          variables,
        })
      }
      setSearchState('Init')
      setSearchResult([])
      scrollIdRef.current = ''
    }
  }, [searchParams])
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
