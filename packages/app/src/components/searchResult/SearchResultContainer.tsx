import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Subject,
  Celebrity,
  useSubjectSearchLazyQuery,
  useCelebritySearchLazyQuery,
  useCelebrityScrollLazyQuery,
  useSubjectScrollLazyQuery,
  SubjectSearchResultFragment,
  CelebritySearchResultFragment,
  SubjectSearchQuery,
  CelebritySearchQuery,
  SubjectScrollQuery,
  CelebrityScrollQuery,
  SubjectSearchQueryVariables,
  SubjectScrollQueryVariables,
} from '../../graphql/index.generated'
import { SearchResultRenderer } from './SearchResultRenderer'
import { SearchState } from '../../Types'
import { omitBy, isNil, isEmpty } from 'lodash'
import { ApolloError, LazyQueryExecFunction } from '@apollo/client'

interface ISearchResultInnerContainerProps {
  isCelebrity: boolean
  getSearchResult: LazyQueryExecFunction<SubjectSearchQuery | CelebritySearchQuery, SubjectSearchQueryVariables>
  scroll: LazyQueryExecFunction<SubjectScrollQuery | CelebrityScrollQuery, SubjectScrollQueryVariables>
  loading: boolean
  data?: SubjectSearchResultFragment | CelebritySearchResultFragment | null
  error?: ApolloError
  scrollLoading: boolean
  scrollData?: SubjectSearchResultFragment | CelebritySearchResultFragment | null
  scrollError?: ApolloError
}

const SearchResultContainer: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams()
  const [
    getSubjectSearchResult,
    {
      loading: subjectLoading,
      data: { querySubjectSearch: subjectData } = {} as SubjectSearchQuery,
      error: subjectError,
    },
  ] = useSubjectSearchLazyQuery()
  const [
    subjectScroll,
    {
      loading: subjectScrollLoading,
      data: { queryScroll: subjectScrollData } = {} as SubjectScrollQuery,
      error: subjectScrollError,
    },
  ] = useSubjectScrollLazyQuery({
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  })
  const [
    getCelebritySearchResult,
    {
      loading: celebrityLoading,
      data: { queryCelebritySearch: celebrityData } = {} as CelebritySearchQuery,
      error: celebrityError,
    },
  ] = useCelebritySearchLazyQuery()
  const [
    celebrityScroll,
    {
      loading: celebrityScrollLoading,
      data: { queryScroll: celebrityScrollData } = {} as CelebrityScrollQuery,
      error: celebrityScrollError,
    },
  ] = useCelebrityScrollLazyQuery({
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  })
  const type = searchParams.get('type')
  if (!type) return null
  const isCelebrity = type === 'celebrity' || type === 'person' || type === 'character'
  return (
    <SearchResultInnerContainer
      isCelebrity={isCelebrity}
      getSearchResult={isCelebrity ? getCelebritySearchResult : getSubjectSearchResult}
      scroll={isCelebrity ? celebrityScroll : subjectScroll}
      loading={isCelebrity ? celebrityLoading : subjectLoading}
      data={isCelebrity ? celebrityData : subjectData}
      error={isCelebrity ? celebrityError : subjectError}
      scrollLoading={isCelebrity ? celebrityScrollLoading : subjectScrollLoading}
      scrollData={isCelebrity ? celebrityScrollData : subjectScrollData}
      scrollError={isCelebrity ? celebrityScrollError : subjectScrollError}
    />
  )
})

SearchResultContainer.displayName = 'SearchResultContainer'

const SearchResultInnerContainer: React.FC<ISearchResultInnerContainerProps> = React.memo(
  ({ isCelebrity, getSearchResult, scroll, loading, data, error, scrollLoading, scrollData, scrollError }) => {
    const [searchResult, setSearchResult] = React.useState<(Subject | Celebrity)[]>([])
    const [searchState, setSearchState] = React.useState<SearchState>('Init')
    const scrollIdRef = React.useRef('')
    const [searchParams] = useSearchParams()

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
        const variables = omitBy(
          {
            dateRange: omitBy(
              {
                lte: searchParams.get('lte'),
                gte: searchParams.get('gte'),
              },
              (item) => isNil(item) || isEmpty(item)
            ),
            q: searchParams.has('q') ? decodeURIComponent(searchParams.get('q') ?? '') : undefined,
            tags: searchParams
              .get('tags')
              ?.split(' ')
              ?.map((tag) => decodeURIComponent(tag)),
            type: searchParams.get('type'),
            sortBy: searchParams.get('sortBy'),
            rankRange: omitBy(
              {
                lte: Number(searchParams.get('rlte')),
                gte: Number(searchParams.get('rgte')),
              },
              (item) => isNil(item) || item === 0
            ),
            customRankRange: omitBy(
              {
                lte: Number(searchParams.get('clte')),
                gte: Number(searchParams.get('cgte')),
              },
              (item) => isNil(item) || item === 0
            ),
            scoreRange: omitBy(
              {
                lte: Number(searchParams.get('slte')),
                gte: Number(searchParams.get('sgte')),
              },
              (item) => isNil(item) || item === 0
            ),
          },
          (item) => isNil(item) || isEmpty(item)
        )
        if (!isEmpty(variables)) {
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
      } else if (data?.result.length === 0) {
        setSearchState('Complete')
      } else if (!!data?.result && data?.result.length > 0) {
        setSearchState('ResultAvailable')
        setSearchResult(data?.result ?? [])
        scrollIdRef.current = data?.scroll_id || ''
      }
    }, [loading, data, error])
    useEffect(() => {
      if (scrollLoading) {
        setSearchState('Scrolling')
      } else if (scrollError) {
        setSearchState('Error')
      } else if (scrollData?.result.length === 0) {
        setSearchState('Complete')
      } else if (!!scrollData?.result && scrollData?.result.length > 0) {
        setSearchState('ResultAvailable')
        setSearchResult((prev) => {
          return [...prev, ...(scrollData?.result ?? [])]
        })
      }
    }, [scrollLoading, scrollData, scrollError])
    return (
      <SearchResultRenderer
        isCelebrity={isCelebrity}
        state={searchState}
        searchResult={searchResult}
        onScroll={onScroll}
      />
    )
  }
)

SearchResultInnerContainer.displayName = 'SearchResultInnerContainer'

export { SearchResultContainer }
