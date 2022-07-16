import { GetRankingListQuery } from './graphql/index.generated'

export type Order = 'asc' | 'desc'
export type OrderKey = 'score' | 'scientificRank' | 'rank'
export type Subject = GetRankingListQuery['queryRankingList'][0]
export type SubjectKey = keyof GetRankingListQuery['queryRankingList'][0]
export type SubjectType = 'anime' | 'book' | 'game' | 'music' | 'real'

export type InfoBox = Array<{
  key: string
  value:
    | string
    | Array<{
        k?: string
        v: string
      }>
}>
