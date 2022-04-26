exports.schema = `

type Tag {
  content: String!,
  userCount: Int!,
  confidence: Float!
}

type CustomRank {
  sciRank: Int!
}

type Subject {
  id: ID!,
  name: String!,
  nameCN: String,
  infobox: String!,
  platform: Int!,
  summary: String,
  rank: Int,
  nsfw: Boolean!,
  type: String!,
  favCount: Int!,
  rateCount: Int!,
  collectCount: Int!,
  doCount: Int!,
  droppedCount: Int!,
  onHoldCount: Int!,
  wishCount: Int!,
  score: Float,
  scientificRank: CustomRank,
  tags: [Tag!],
}


type Images {
  large: String!,
  common: String!,
  medium: String!,
  small: String!,
  grid: String!,
}

type Item {
  key: String!,
  value: String!,
}

type Rating {
  rank: Int!,
  total: Int!,
  count: String!,
  score: Float!,
}

type Collection {
  wish: Int!,
  collect: Int!,
  doing: Int!,
  on_hold: Int!,
  dropped: Int!,
}

type BangumiSubject {
  id: ID!,
  type: String!,
  name: String!,
  name_cn: String!,
  summary: String!,
  nsfw: Boolean!,
  locled: Boolean!,
  date: String,
  platform: String,
  images: Images,
  infobox: [Item],
  volumes: Int!,
  eps: Int!,
  total_episodes: Int!,
  rating: Rating,
  collection: Collection,
}

type Query {
  queryRankingDate: String!,
  queryRankingList(type: String): [Subject!]!,
  queryAutoComplete(q: String): [String!],
  queryRelatedSubjects(q: String): [Subject!],
  queryRelatedTags(q: String): [Tag!],

  querySubject(id: Int): Subject,
  queryBangumiSubject(id: Int): BangumiSubject,
}
`
