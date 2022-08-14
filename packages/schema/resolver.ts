import { IContext } from './context'

export const resolvers = {
  Query: {
    queryRankingDate: async (_: object, {}, context: IContext) => {
      return await context.chiiAPI.getLastDate()
    },
    queryRankingList: async (_: object, { type }: { type: string }, context: IContext) => {
      return await context.chiiAPI.getRankedList(type).then((list) =>
        list.map((item) => ({
          ...item,
          scientificRank: item.scientificRank?.sciRank,
        }))
      )
    },
    queryAutoComplete: async (_: object, { q }: { q: string }, context: IContext) => {
      return await context.chiiAPI.getAutoComplete(q)
    },
    queryRelatedSubjects: async (_: object, { q }: { q: string }, context: IContext) => {
      return await context.chiiAPI.getRelatedSubjects(q).then((list) =>
        list.map((item) => ({
          ...item,
          scientificRank: item.scientificRank?.sciRank,
        }))
      )
    },
    queryRelatedTags: async (_: object, { q }: { q: string }, context: IContext) => {
      return await context.chiiAPI.getRelatedTags(q)
    },

    querySubject: async (_: object, { id }: { id: number }, context: IContext) => {
      return await context.chiiAPI
        .getSubject(id)
        .then((data) => ({ ...data, scientificRank: data.scientificRank?.sciRank }))
    },
    queryBangumiSubject: async (_: object, { id }: { id: number }, context: IContext) => {
      return await context.bangumiAPI
        .getSubject(id)
        .then((data) => ({ ...data, rating: { ...data.rating, count: JSON.stringify(data.rating.count) } }))
    },
  },
}
