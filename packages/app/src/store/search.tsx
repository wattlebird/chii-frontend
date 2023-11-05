import React, { useState, useContext, createContext } from 'react'
import { DateRange } from '../graphql/index.generated'

type SubjectType = 'anime' | 'book' | 'music' | 'game' | 'real' | 'all'

export interface ISearchContext {
  q?: string
  type?: SubjectType
  dateRange?: DateRange
  tags?: string[]
  updateQuery: (q?: string, type?: SubjectType, tags?: string[], dateRange?: DateRange) => void
}

// Create the context
const SearchContext = createContext<ISearchContext | null>(null)

// Create the provider
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<Omit<ISearchContext, 'updateQuery'>>({
    q: '',
    type: 'all',
  })

  const updateQuery = (q?: string, type?: SubjectType, tags?: string[], dateRange?: DateRange) => {
    setQuery({
      ...query,
      q: q || query.q,
      type: type || query.type,
      tags: tags || query.tags,
      dateRange: dateRange || query.dateRange,
    })
  }

  const value: ISearchContext = {
    ...query,
    updateQuery,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

// Create a custom hook to consume the context
export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('SearchContext must be used within a SearchProvider')
  }
  return context
}
