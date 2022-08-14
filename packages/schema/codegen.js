/* eslint-disable @typescript-eslint/no-var-requires */
const { buildSchema } = require('graphql')
const { schema } = require('./schema')

module.exports = buildSchema(schema)
