import React from 'react'
import { CelebritySortBy, DateRange, SubjectSortBy, RankRange, ScoreRange } from '../graphql/index.generated'

export interface ISearchOptionsContext {
  category: string
  setCategory: (_cat: string) => void
  query: string
  setQuery: (_q: string) => void
  tags: string[]
  setTags: (_t: string[]) => void
  dateRange?: DateRange
  setDateRange: (_dr: DateRange | undefined) => void
  subSortBy: SubjectSortBy
  setSubSortBy: (_sortBy: SubjectSortBy) => void
  celebSortBy: CelebritySortBy
  setCelebSortBy: (_sortBy: CelebritySortBy) => void
  rankRange?: RankRange
  setRankRange: (_rr: RankRange | undefined) => void
  customRankRange?: RankRange
  setCustomRankRange: (_rr: RankRange | undefined) => void
  scoreRange?: ScoreRange
  setScoreRange: (_sr: ScoreRange | undefined) => void
}

export const SearchOptionsContext = React.createContext<ISearchOptionsContext>({
  category: 'anime',
  setCategory: () => {},
  query: '',
  setQuery: () => {},
  tags: [],
  setTags: () => {},
  dateRange: undefined,
  setDateRange: () => undefined,
  subSortBy: SubjectSortBy.Default,
  setSubSortBy: () => {},
  celebSortBy: CelebritySortBy.Default,
  setCelebSortBy: () => {},
  rankRange: undefined,
  setRankRange: () => {},
  customRankRange: undefined,
  setCustomRankRange: () => {},
  scoreRange: undefined,
  setScoreRange: () => {},
})

function useSearchOptions(): ISearchOptionsContext {
  const [category, setCategory] = React.useState<string>('anime')
  const [query, setQuery] = React.useState<string>('')
  const [tags, setTags] = React.useState<string[]>([])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [subSortBy, setSubSortBy] = React.useState<SubjectSortBy>(SubjectSortBy.Default)
  const [celebSortBy, setCelebSortBy] = React.useState<CelebritySortBy>(CelebritySortBy.Default)
  const [rankRange, setRankRange] = React.useState<RankRange | undefined>()
  const [customRankRange, setCustomRankRange] = React.useState<RankRange | undefined>()
  const [scoreRange, setScoreRange] = React.useState<ScoreRange | undefined>()
  return {
    category,
    setCategory,
    query,
    setQuery,
    tags,
    setTags,
    dateRange,
    setDateRange,
    subSortBy,
    setSubSortBy,
    celebSortBy,
    setCelebSortBy,
    rankRange,
    setRankRange,
    customRankRange,
    setCustomRankRange,
    scoreRange,
    setScoreRange,
  }
}

export const SearchOptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchOptions = useSearchOptions();

  return (
    <SearchOptionsContext.Provider value={searchOptions}>
      {children}
    </SearchOptionsContext.Provider>
  )
}
