import React, { useContext, createContext, useReducer, useCallback } from 'react'
import { DateRange } from '../graphql/index.generated'

type SubjectType = 'anime' | 'book' | 'music' | 'game' | 'real'

export interface ISearchContext {
  q?: string
  type?: SubjectType
  dateRange?: DateRange
  tags?: string[]
  updateQuery: (q: string) => void
  updateType: (type: SubjectType) => void
  updateDateRange: (dateRange: DateRange) => void
  updateTags: (tags: string[]) => void
}

type ISearchContent = Omit<ISearchContext, 'updateQuery' | 'updateType' | 'updateDateRange' | 'updateTags'>

// Create the context
const SearchContext = createContext<ISearchContext | null>(null)

// Create the provider
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduceQuery = useCallback((query: ISearchContent, action: { name: string } & ISearchContent) => {
    switch (action.name) {
      case 'query':
        return {
          ...query,
          q: action.q,
        }
      case 'type':
        return {
          ...query,
          type: action.type,
        }
      case 'dateRange':
        return {
          ...query,
          dateRange: action.dateRange,
        }
      case 'tags':
        return {
          ...query,
          tags: action.tags,
        }
      default:
        throw Error('Unknown action: ' + action.name)
    }
  }, [])
  const [query, dispatch] = useReducer(reduceQuery, { q: '', type: 'anime' })

  const updateQuery = useCallback(
    (q: string) => {
      dispatch({
        name: 'query',
        q,
      })
    },
    [dispatch]
  )

  const updateType = useCallback(
    (type: SubjectType) => {
      dispatch({
        name: 'type',
        type,
      })
    },
    [dispatch]
  )

  const updateDateRange = useCallback(
    (dateRange: DateRange) => {
      dispatch({
        name: 'dateRange',
        dateRange,
      })
    },
    [dispatch]
  )

  const updateTags = useCallback(
    (tags: string[]) => {
      dispatch({
        name: 'tags',
        tags,
      })
    },
    [dispatch]
  )

  const value: ISearchContext = {
    ...query,
    updateQuery,
    updateType,
    updateDateRange,
    updateTags,
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
