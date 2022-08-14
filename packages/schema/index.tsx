import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolver'
import { schema as typeDefs } from './schema'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export * from './context'
