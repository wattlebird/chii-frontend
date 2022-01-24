import { IContext } from './context'

export const resolvers = {
  SubjectType: {
    ANIME: 'anime',
    BOOK: 'book',
    GAME: 'game',
    MUSIC: 'music',
    REAL: 'real'
  },

  Query: {
    queryRankingDate: async (_: object, {}, context: IContext) => {
      return await context.chiiAPI.getLastDate()
    },
    queryRankingCount: async (_: object, {}, context: IContext) => {
      return await context.chiiAPI.getSubjectCount('anime', true)
    },
    queryRankingList: async (
      _: object,
      { bysci, from, step }: { bysci: boolean; from: number; step: number },
      context: IContext
    ) => {
      return await context.chiiAPI.getRankedList('anime', from, step, bysci)
    },
    querySubject: async (_: object, { id }: { id: number }, context: IContext) => {
      return await context.chiiAPI.getSubject(id)
    },
    getTagList: async (_: object, {}, context: IContext) => {
      return await context.chiiAPI.getTags()
    },
    searchByTag: async (
      _: object,
      { tags, minVoters, minFavs }: { tags: string[]; minVoters: number; minFavs: number },
      context: IContext
    ) => {
      return await context.chiiAPI.searchSubjectByTags(tags, minVoters, minFavs)
    },
    searchRelatedTags: async (_: object, { tags }: { tags: string[] }, context: IContext) => {
      return await context.chiiAPI.searchRelatedTags(tags)
    },

    queryBangumiSubject: async (_: object, { id }: { id: number }, context: IContext) => {
      return await context.bangumiAPI.getSubject(id)
    }
  }
}
