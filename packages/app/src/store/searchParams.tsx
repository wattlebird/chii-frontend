import React from 'react'
import { CelebritySortBy, DateRange, SubjectSortBy, RankRange } from '../graphql/index.generated'

export interface ISearchOptionsContext {
  category: string
  setCategory: (cat: string) => void
  query: string
  setQuery: (q: string) => void
  tags: string[]
  setTags: (t: string[]) => void
  dateRange?: DateRange
  setDateRange: (dr: DateRange | undefined) => void
  subSortBy: SubjectSortBy
  setSubSortBy: (sortBy: SubjectSortBy) => void
  celebSortBy: CelebritySortBy
  setCelebSortBy: (sortBy: CelebritySortBy) => void
  rankRange?: RankRange
  setRankRange: (rr: RankRange | undefined) => void
  customRankRange?: RankRange
  setCustomRankRange: (rr: RankRange | undefined) => void
}

export const SearchOptionsContext = React.createContext<ISearchOptionsContext>({
  category: 'anime',
  setCategory: (cat: string) => {},
  query: '',
  setQuery: (q: string) => {},
  tags: [],
  setTags: (t: string[]) => {},
  dateRange: undefined,
  setDateRange: (dr: DateRange | undefined) => undefined,
  subSortBy: SubjectSortBy.Default,
  setSubSortBy: (sortBy: SubjectSortBy) => {},
  celebSortBy: CelebritySortBy.Default,
  setCelebSortBy: (sortBy: CelebritySortBy) => {},
  rankRange: undefined,
  setRankRange: () => {},
  customRankRange: undefined,
  setCustomRankRange: () => {},
})

export function useSearchOptions(): ISearchOptionsContext {
  const [category, setCategory] = React.useState<string>('anime')
  const [query, setQuery] = React.useState<string>('')
  const [tags, setTags] = React.useState<string[]>([])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [subSortBy, setSubSortBy] = React.useState<SubjectSortBy>(SubjectSortBy.Default)
  const [celebSortBy, setCelebSortBy] = React.useState<CelebritySortBy>(CelebritySortBy.Default)
  const [rankRange, setRankRange] = React.useState<RankRange | undefined>()
  const [customRankRange, setCustomRankRange] = React.useState<RankRange | undefined>()
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
  }
}
