import { IContext } from './context'

export const resolvers = {
  Query: {
    queryRankingDate: async (_: object, {}, context: IContext) => {
      return await context.chiiAPI.getLastDate()
    },
    queryRankingList: async (_: object, { type }: { type: string }, context: IContext) => {
      return await context.chiiAPI.getRankedList(type)
    },
    queryAutoComplete: async (_: object, { q }: { q: string }, context: IContext) => {
      return await context.chiiAPI.getAutoComplete(q)
    },
    queryRelatedSubjects: async (_: object, { q }: { q: string }, context: IContext) => {
      return await context.chiiAPI.getRelatedSubjects(q)
    },
    queryRelatedTags: async (_: object, { q }: { q: string }, context: IContext) => {
      return await context.chiiAPI.getRelatedTags(q)
    },

    querySubject: async (_: object, { id }: { id: number }, context: IContext) => {
      return await context.chiiAPI.getSubject(id)
    },
    queryBangumiSubject: async (_: object, { id }: { id: number }, context: IContext) => {
      return await context.bangumiAPI.getSubject(id)
    }
  }
}
