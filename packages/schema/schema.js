exports.schema = `
enum SubjectType {
  ANIME
  BOOK
  GAME
  MUSIC
  REAL
}

type Tag {
  tag: String!,
  tagCount: Int!,
  userCount: Int!
  confidence: Float!
}

type BriefTag {
  tag: String!,
  coverage: Int!,
  confidence: Float!
}

type Subject {
  id: ID!,
  name: String!,
  nameCN: String,
  type: SubjectType!,
  rank: Int,
  sciRank: Int,
  date: String,
  votenum: Int!,
  favnum: Int!,
  tags: [Tag]
}


type ImageUrls {
  large: String!,
  common: String!,
  medium: String!,
  small: String!,
  grid: String!,
}

type SubjectSmall {
  id: ID!,
  url: String!,
  type: String!,
  name: String!,
  name_cn: String,
  summary: String,
  air_date: String,
  air_weekday: Int,
  images: ImageUrls
}

type Query {
  queryRankingDate: String,
  queryRankingList(bysci: Boolean, from: Int, step: Int): [Subject],
  queryRankingCount: Int,
  querySubject(id: Int): Subject,
  getTagList: [BriefTag],
  searchByTag(tags: [String], minVoters: Int, minFavs: Int): [Subject],
  searchRelatedTags(tags: [String]): [BriefTag],
  queryBangumiSubject(id: Int): SubjectSmall
}
`
