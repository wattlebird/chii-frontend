import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BangumiCharacter = {
  __typename?: 'BangumiCharacter';
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Images>;
  infobox?: Maybe<Array<Maybe<Info>>>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  stat: CelebrityStat;
  summary: Scalars['String']['output'];
  type: Scalars['Int']['output'];
};

export type BangumiPerson = {
  __typename?: 'BangumiPerson';
  career: Array<Maybe<Scalars['String']['output']>>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Images>;
  infobox?: Maybe<Array<Maybe<Info>>>;
  last_modified: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  stat: CelebrityStat;
  summary: Scalars['String']['output'];
  type: Scalars['Int']['output'];
};

export type BangumiSubject = {
  __typename?: 'BangumiSubject';
  collection: Collection;
  date?: Maybe<Scalars['String']['output']>;
  eps: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  images: Images;
  infobox?: Maybe<Array<Maybe<Info>>>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  name_cn: Scalars['String']['output'];
  nsfw: Scalars['Boolean']['output'];
  platform: Scalars['String']['output'];
  rating: Rating;
  summary: Scalars['String']['output'];
  total_episodes: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  volumes: Scalars['Int']['output'];
};

export type BangumiUser = {
  __typename?: 'BangumiUser';
  avatar: Images;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  reg_time?: Maybe<Scalars['String']['output']>;
  sign?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  user_group: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type Celebrity = {
  __typename?: 'Celebrity';
  alias?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  score?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum CelebritySortBy {
  Collects = 'Collects',
  Comments = 'Comments',
  Default = 'Default'
}

export type CelebrityStat = {
  __typename?: 'CelebrityStat';
  collects: Scalars['Int']['output'];
  comments: Scalars['Int']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  collect: Scalars['Int']['output'];
  doing: Scalars['Int']['output'];
  dropped: Scalars['Int']['output'];
  on_hold: Scalars['Int']['output'];
  wish: Scalars['Int']['output'];
};

export type DateRange = {
  gte?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
};

export type Images = {
  __typename?: 'Images';
  large: Scalars['String']['output'];
  medium: Scalars['String']['output'];
  small: Scalars['String']['output'];
};

export type Info = {
  __typename?: 'Info';
  key: Scalars['String']['output'];
  value?: Maybe<InfoValue>;
};

export type InfoValue = {
  __typename?: 'InfoValue';
  list?: Maybe<Array<Maybe<Kv>>>;
  property?: Maybe<Scalars['String']['output']>;
};

export type Item = {
  __typename?: 'Item';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Kv = {
  __typename?: 'KV';
  k?: Maybe<Scalars['String']['output']>;
  v: Scalars['String']['output'];
};

/** The query root of chii.ai's GraphQL interface. */
export type Query = {
  __typename?: 'Query';
  /** Auto complete a tag prefix, at most 10 results would be returned */
  queryAutoComplete?: Maybe<Array<Scalars['String']['output']>>;
  /** Wrapper of bangumi /characters API */
  queryBangumiCharacter?: Maybe<BangumiCharacter>;
  /** Wrapper of bangumi /me API */
  queryBangumiMe?: Maybe<BangumiUser>;
  /** Wrapper of bangumi /persons API */
  queryBangumiPerson?: Maybe<BangumiPerson>;
  /** Wrapper of bangumi /subject API */
  queryBangumiSubject?: Maybe<BangumiSubject>;
  /** Search celebrity given query and type */
  queryCelebritySearch?: Maybe<SearchResult>;
  /** Get current custom ranking generation date */
  queryRankingDate: Scalars['String']['output'];
  /** Get current custom ranking list. */
  queryRankingList?: Maybe<SearchResult>;
  /** Search tags related to given tags */
  queryRelatedTags?: Maybe<Array<Tag>>;
  /**
   * Scroll a search result.
   * This query should be involked after `querySearch`, `queryAdvancedSearch` and `queryRelatedSubjects`
   */
  queryScroll?: Maybe<SearchResult>;
  /** Search subjects given query, tags, type and date range */
  querySubjectSearch?: Maybe<SearchResult>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryAutoCompleteArgs = {
  fields?: InputMaybe<Scalars['String']['input']>;
  q: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryBangumiCharacterArgs = {
  id: Scalars['Int']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryBangumiMeArgs = {
  token: Scalars['String']['input'];
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryBangumiPersonArgs = {
  id: Scalars['Int']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryBangumiSubjectArgs = {
  id: Scalars['Int']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryCelebritySearchArgs = {
  q?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<CelebritySortBy>;
  type?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryRankingListArgs = {
  type: Scalars['String']['input'];
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryRelatedTagsArgs = {
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryScrollArgs = {
  scroll_id?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQuerySubjectSearchArgs = {
  customRankRange?: InputMaybe<RankRange>;
  dateRange?: InputMaybe<DateRange>;
  q?: InputMaybe<Scalars['String']['input']>;
  rankRange?: InputMaybe<RankRange>;
  scoreRange?: InputMaybe<ScoreRange>;
  sortBy?: InputMaybe<SubjectSortBy>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type RankRange = {
  gte?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
};

export type Rating = {
  __typename?: 'Rating';
  count: Array<Maybe<Scalars['Int']['output']>>;
  rank: Scalars['Int']['output'];
  score: Scalars['Float']['output'];
  total: Scalars['Int']['output'];
};

export type ScoreRange = {
  gte?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type SearchItem = Celebrity | Subject;

export type SearchResult = {
  __typename?: 'SearchResult';
  result: Array<SearchItem>;
  scroll_id?: Maybe<Scalars['String']['output']>;
  timed_out: Scalars['Boolean']['output'];
  took: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type Subject = {
  __typename?: 'Subject';
  avgscore?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nameCN?: Maybe<Scalars['String']['output']>;
  nsfw?: Maybe<Scalars['Boolean']['output']>;
  platform?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  scientificRank?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  summary?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum SubjectSortBy {
  CustomRank = 'CustomRank',
  Date = 'Date',
  Default = 'Default',
  Fav = 'Fav',
  Hotness = 'Hotness',
  Rank = 'Rank'
}

export type Tag = {
  __typename?: 'Tag';
  confidence: Scalars['Float']['output'];
  content: Scalars['String']['output'];
  userCount: Scalars['Int']['output'];
};

export type GetRankingDateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRankingDateQuery = { __typename?: 'Query', queryRankingDate: string };

export type GetRankingListQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type GetRankingListQuery = { __typename?: 'Query', queryRankingList?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
      | { __typename?: 'Celebrity' }
      | { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }
    > } | null };

export type GetAutoCompleteQueryVariables = Exact<{
  q: Scalars['String']['input'];
  type: Scalars['String']['input'];
  fields?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAutoCompleteQuery = { __typename?: 'Query', queryAutoComplete?: Array<string> | null };

export type SubjectSearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  dateRange?: InputMaybe<DateRange>;
  sortBy?: InputMaybe<SubjectSortBy>;
  rankRange?: InputMaybe<RankRange>;
  customRankRange?: InputMaybe<RankRange>;
  scoreRange?: InputMaybe<ScoreRange>;
}>;


export type SubjectSearchQuery = { __typename?: 'Query', querySubjectSearch?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
      | { __typename?: 'Celebrity' }
      | { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }
    > } | null };

export type CelebritySearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<CelebritySortBy>;
}>;


export type CelebritySearchQuery = { __typename?: 'Query', queryCelebritySearch?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
      | { __typename?: 'Celebrity', id: string, name: string, alias?: Array<string | null> | null, score?: Array<number | null> | null, type?: string | null }
      | { __typename?: 'Subject' }
    > } | null };

export type SubjectScrollQueryVariables = Exact<{
  scroll_id: Scalars['String']['input'];
}>;


export type SubjectScrollQuery = { __typename?: 'Query', queryScroll?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
      | { __typename?: 'Celebrity' }
      | { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }
    > } | null };

export type CelebrityScrollQueryVariables = Exact<{
  scroll_id: Scalars['String']['input'];
}>;


export type CelebrityScrollQuery = { __typename?: 'Query', queryScroll?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
      | { __typename?: 'Celebrity', id: string, name: string, alias?: Array<string | null> | null, score?: Array<number | null> | null, type?: string | null }
      | { __typename?: 'Subject' }
    > } | null };

export type GetRelatedTagsQueryVariables = Exact<{
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetRelatedTagsQuery = { __typename?: 'Query', queryRelatedTags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null };

export type GetBangumiSubjectQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBangumiSubjectQuery = { __typename?: 'Query', queryBangumiSubject?: { __typename?: 'BangumiSubject', id: string, type: string, name: string, name_cn: string, summary: string, nsfw: boolean, locked: boolean, date?: string | null, platform: string, volumes: number, eps: number, total_episodes: number, images: { __typename?: 'Images', large: string, medium: string, small: string }, rating: { __typename?: 'Rating', rank: number, total: number, count: Array<number | null>, score: number }, collection: { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number }, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null } | null };

export type GetBangumiPersonQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBangumiPersonQuery = { __typename?: 'Query', queryBangumiPerson?: { __typename?: 'BangumiPerson', id: string, career: Array<string | null>, gender?: string | null, last_modified: string, locked: boolean, name: string, summary: string, type: number, images?: { __typename?: 'Images', large: string, medium: string, small: string } | null, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null } | null };

export type GetBangumiCharacterQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBangumiCharacterQuery = { __typename?: 'Query', queryBangumiCharacter?: { __typename?: 'BangumiCharacter', id: string, gender?: string | null, locked: boolean, name: string, summary: string, type: number, images?: { __typename?: 'Images', large: string, medium: string, small: string } | null, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null } | null };

export type GetBangumiMeQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetBangumiMeQuery = { __typename?: 'Query', queryBangumiMe?: { __typename?: 'BangumiUser', id: string, username: string, nickname: string, sign?: string | null, url: string, user_group: number, reg_time?: string | null, email?: string | null, avatar: { __typename?: 'Images', large: string, medium: string, small: string } } | null };

export type TagFragment = { __typename?: 'Tag', content: string, userCount: number, confidence: number };

export type SubjectFragment = { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null };

export type CelebrityFragment = { __typename?: 'Celebrity', id: string, name: string, alias?: Array<string | null> | null, score?: Array<number | null> | null, type?: string | null };

export type ImagesFragment = { __typename?: 'Images', large: string, medium: string, small: string };

export type ItemFragment = { __typename?: 'Item', key: string, value: string };

export type RatingFragment = { __typename?: 'Rating', rank: number, total: number, count: Array<number | null>, score: number };

export type CollectionFragment = { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number };

export type KvFragment = { __typename?: 'KV', k?: string | null, v: string };

export type InfoValueFragment = { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null };

export type InfoFragment = { __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null };

export type BangumiSubjectFragment = { __typename?: 'BangumiSubject', id: string, type: string, name: string, name_cn: string, summary: string, nsfw: boolean, locked: boolean, date?: string | null, platform: string, volumes: number, eps: number, total_episodes: number, images: { __typename?: 'Images', large: string, medium: string, small: string }, rating: { __typename?: 'Rating', rank: number, total: number, count: Array<number | null>, score: number }, collection: { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number }, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null };

export type BangumiCharacterFragment = { __typename?: 'BangumiCharacter', id: string, gender?: string | null, locked: boolean, name: string, summary: string, type: number, images?: { __typename?: 'Images', large: string, medium: string, small: string } | null, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null };

export type BangumiPersonFragment = { __typename?: 'BangumiPerson', id: string, career: Array<string | null>, gender?: string | null, last_modified: string, locked: boolean, name: string, summary: string, type: number, images?: { __typename?: 'Images', large: string, medium: string, small: string } | null, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null };

export type BangumiUserFragment = { __typename?: 'BangumiUser', id: string, username: string, nickname: string, sign?: string | null, url: string, user_group: number, reg_time?: string | null, email?: string | null, avatar: { __typename?: 'Images', large: string, medium: string, small: string } };

export type SubjectSearchResultFragment = { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
    | { __typename?: 'Celebrity' }
    | { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }
  > };

export type CelebritySearchResultFragment = { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<
    | { __typename?: 'Celebrity', id: string, name: string, alias?: Array<string | null> | null, score?: Array<number | null> | null, type?: string | null }
    | { __typename?: 'Subject' }
  > };

export const ItemFragmentDoc = gql`
    fragment Item on Item {
  key
  value
}
    `;
export const ImagesFragmentDoc = gql`
    fragment Images on Images {
  large
  medium
  small
}
    `;
export const RatingFragmentDoc = gql`
    fragment Rating on Rating {
  rank
  total
  count
  score
}
    `;
export const CollectionFragmentDoc = gql`
    fragment Collection on Collection {
  wish
  collect
  doing
  on_hold
  dropped
}
    `;
export const KvFragmentDoc = gql`
    fragment KV on KV {
  k
  v
}
    `;
export const InfoValueFragmentDoc = gql`
    fragment InfoValue on InfoValue {
  property
  list {
    ...KV
  }
}
    ${KvFragmentDoc}`;
export const InfoFragmentDoc = gql`
    fragment Info on Info {
  key
  value {
    ...InfoValue
  }
}
    ${InfoValueFragmentDoc}`;
export const BangumiSubjectFragmentDoc = gql`
    fragment BangumiSubject on BangumiSubject {
  id
  type
  name
  name_cn
  summary
  nsfw
  locked
  date
  platform
  images {
    ...Images
  }
  volumes
  eps
  total_episodes
  rating {
    ...Rating
  }
  collection {
    ...Collection
  }
  infobox {
    ...Info
  }
}
    ${ImagesFragmentDoc}
${RatingFragmentDoc}
${CollectionFragmentDoc}
${InfoFragmentDoc}`;
export const BangumiCharacterFragmentDoc = gql`
    fragment BangumiCharacter on BangumiCharacter {
  id
  gender
  locked
  name
  summary
  type
  images {
    ...Images
  }
  infobox {
    ...Info
  }
}
    ${ImagesFragmentDoc}
${InfoFragmentDoc}`;
export const BangumiPersonFragmentDoc = gql`
    fragment BangumiPerson on BangumiPerson {
  id
  career
  gender
  last_modified
  locked
  name
  summary
  type
  images {
    ...Images
  }
  infobox {
    ...Info
  }
}
    ${ImagesFragmentDoc}
${InfoFragmentDoc}`;
export const BangumiUserFragmentDoc = gql`
    fragment BangumiUser on BangumiUser {
  id
  username
  nickname
  sign
  url
  avatar {
    ...Images
  }
  user_group
  reg_time
  email
}
    ${ImagesFragmentDoc}`;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  content
  userCount
  confidence
}
    `;
export const SubjectFragmentDoc = gql`
    fragment Subject on Subject {
  id
  name
  nameCN
  rank
  type
  score
  scientificRank
  tags {
    ...Tag
  }
  date
}
    ${TagFragmentDoc}`;
export const SubjectSearchResultFragmentDoc = gql`
    fragment SubjectSearchResult on SearchResult {
  scroll_id
  took
  timed_out
  total
  result {
    ... on Subject {
      ...Subject
    }
  }
}
    ${SubjectFragmentDoc}`;
export const CelebrityFragmentDoc = gql`
    fragment Celebrity on Celebrity {
  id
  name
  alias
  score
  type
}
    `;
export const CelebritySearchResultFragmentDoc = gql`
    fragment CelebritySearchResult on SearchResult {
  scroll_id
  took
  timed_out
  total
  result {
    ... on Celebrity {
      ...Celebrity
    }
  }
}
    ${CelebrityFragmentDoc}`;
export const GetRankingDateDocument = gql`
    query GetRankingDate {
  queryRankingDate
}
    `;

/**
 * __useGetRankingDateQuery__
 *
 * To run a query within a React component, call `useGetRankingDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRankingDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRankingDateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRankingDateQuery(baseOptions?: Apollo.QueryHookOptions<GetRankingDateQuery, GetRankingDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRankingDateQuery, GetRankingDateQueryVariables>(GetRankingDateDocument, options);
      }
export function useGetRankingDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingDateQuery, GetRankingDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRankingDateQuery, GetRankingDateQueryVariables>(GetRankingDateDocument, options);
        }
// @ts-ignore
export function useGetRankingDateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRankingDateQuery, GetRankingDateQueryVariables>): Apollo.UseSuspenseQueryResult<GetRankingDateQuery, GetRankingDateQueryVariables>;
export function useGetRankingDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRankingDateQuery, GetRankingDateQueryVariables>): Apollo.UseSuspenseQueryResult<GetRankingDateQuery | undefined, GetRankingDateQueryVariables>;
export function useGetRankingDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRankingDateQuery, GetRankingDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRankingDateQuery, GetRankingDateQueryVariables>(GetRankingDateDocument, options);
        }
export type GetRankingDateQueryHookResult = ReturnType<typeof useGetRankingDateQuery>;
export type GetRankingDateLazyQueryHookResult = ReturnType<typeof useGetRankingDateLazyQuery>;
export type GetRankingDateSuspenseQueryHookResult = ReturnType<typeof useGetRankingDateSuspenseQuery>;
export type GetRankingDateQueryResult = Apollo.QueryResult<GetRankingDateQuery, GetRankingDateQueryVariables>;
export const GetRankingListDocument = gql`
    query GetRankingList($type: String!) {
  queryRankingList(type: $type) {
    ...SubjectSearchResult
  }
}
    ${SubjectSearchResultFragmentDoc}`;

/**
 * __useGetRankingListQuery__
 *
 * To run a query within a React component, call `useGetRankingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRankingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRankingListQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetRankingListQuery(baseOptions: Apollo.QueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables> & ({ variables: GetRankingListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, options);
      }
export function useGetRankingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, options);
        }
// @ts-ignore
export function useGetRankingListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>): Apollo.UseSuspenseQueryResult<GetRankingListQuery, GetRankingListQueryVariables>;
export function useGetRankingListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>): Apollo.UseSuspenseQueryResult<GetRankingListQuery | undefined, GetRankingListQueryVariables>;
export function useGetRankingListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, options);
        }
export type GetRankingListQueryHookResult = ReturnType<typeof useGetRankingListQuery>;
export type GetRankingListLazyQueryHookResult = ReturnType<typeof useGetRankingListLazyQuery>;
export type GetRankingListSuspenseQueryHookResult = ReturnType<typeof useGetRankingListSuspenseQuery>;
export type GetRankingListQueryResult = Apollo.QueryResult<GetRankingListQuery, GetRankingListQueryVariables>;
export const GetAutoCompleteDocument = gql`
    query GetAutoComplete($q: String!, $type: String!, $fields: String) {
  queryAutoComplete(q: $q, type: $type, fields: $fields)
}
    `;

/**
 * __useGetAutoCompleteQuery__
 *
 * To run a query within a React component, call `useGetAutoCompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoCompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoCompleteQuery({
 *   variables: {
 *      q: // value for 'q'
 *      type: // value for 'type'
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useGetAutoCompleteQuery(baseOptions: Apollo.QueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables> & ({ variables: GetAutoCompleteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>(GetAutoCompleteDocument, options);
      }
export function useGetAutoCompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>(GetAutoCompleteDocument, options);
        }
// @ts-ignore
export function useGetAutoCompleteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>): Apollo.UseSuspenseQueryResult<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>;
export function useGetAutoCompleteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>): Apollo.UseSuspenseQueryResult<GetAutoCompleteQuery | undefined, GetAutoCompleteQueryVariables>;
export function useGetAutoCompleteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>(GetAutoCompleteDocument, options);
        }
export type GetAutoCompleteQueryHookResult = ReturnType<typeof useGetAutoCompleteQuery>;
export type GetAutoCompleteLazyQueryHookResult = ReturnType<typeof useGetAutoCompleteLazyQuery>;
export type GetAutoCompleteSuspenseQueryHookResult = ReturnType<typeof useGetAutoCompleteSuspenseQuery>;
export type GetAutoCompleteQueryResult = Apollo.QueryResult<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>;
export const SubjectSearchDocument = gql`
    query SubjectSearch($q: String, $tags: [String!], $type: String, $dateRange: DateRange, $sortBy: SubjectSortBy, $rankRange: RankRange, $customRankRange: RankRange, $scoreRange: ScoreRange) {
  querySubjectSearch(
    q: $q
    tags: $tags
    type: $type
    dateRange: $dateRange
    sortBy: $sortBy
    rankRange: $rankRange
    customRankRange: $customRankRange
    scoreRange: $scoreRange
  ) {
    ...SubjectSearchResult
  }
}
    ${SubjectSearchResultFragmentDoc}`;

/**
 * __useSubjectSearchQuery__
 *
 * To run a query within a React component, call `useSubjectSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectSearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *      tags: // value for 'tags'
 *      type: // value for 'type'
 *      dateRange: // value for 'dateRange'
 *      sortBy: // value for 'sortBy'
 *      rankRange: // value for 'rankRange'
 *      customRankRange: // value for 'customRankRange'
 *      scoreRange: // value for 'scoreRange'
 *   },
 * });
 */
export function useSubjectSearchQuery(baseOptions?: Apollo.QueryHookOptions<SubjectSearchQuery, SubjectSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectSearchQuery, SubjectSearchQueryVariables>(SubjectSearchDocument, options);
      }
export function useSubjectSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectSearchQuery, SubjectSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectSearchQuery, SubjectSearchQueryVariables>(SubjectSearchDocument, options);
        }
// @ts-ignore
export function useSubjectSearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubjectSearchQuery, SubjectSearchQueryVariables>): Apollo.UseSuspenseQueryResult<SubjectSearchQuery, SubjectSearchQueryVariables>;
export function useSubjectSearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubjectSearchQuery, SubjectSearchQueryVariables>): Apollo.UseSuspenseQueryResult<SubjectSearchQuery | undefined, SubjectSearchQueryVariables>;
export function useSubjectSearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubjectSearchQuery, SubjectSearchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubjectSearchQuery, SubjectSearchQueryVariables>(SubjectSearchDocument, options);
        }
export type SubjectSearchQueryHookResult = ReturnType<typeof useSubjectSearchQuery>;
export type SubjectSearchLazyQueryHookResult = ReturnType<typeof useSubjectSearchLazyQuery>;
export type SubjectSearchSuspenseQueryHookResult = ReturnType<typeof useSubjectSearchSuspenseQuery>;
export type SubjectSearchQueryResult = Apollo.QueryResult<SubjectSearchQuery, SubjectSearchQueryVariables>;
export const CelebritySearchDocument = gql`
    query CelebritySearch($q: String, $type: String, $sortBy: CelebritySortBy) {
  queryCelebritySearch(q: $q, type: $type, sortBy: $sortBy) {
    ...CelebritySearchResult
  }
}
    ${CelebritySearchResultFragmentDoc}`;

/**
 * __useCelebritySearchQuery__
 *
 * To run a query within a React component, call `useCelebritySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useCelebritySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCelebritySearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *      type: // value for 'type'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useCelebritySearchQuery(baseOptions?: Apollo.QueryHookOptions<CelebritySearchQuery, CelebritySearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CelebritySearchQuery, CelebritySearchQueryVariables>(CelebritySearchDocument, options);
      }
export function useCelebritySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CelebritySearchQuery, CelebritySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CelebritySearchQuery, CelebritySearchQueryVariables>(CelebritySearchDocument, options);
        }
// @ts-ignore
export function useCelebritySearchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CelebritySearchQuery, CelebritySearchQueryVariables>): Apollo.UseSuspenseQueryResult<CelebritySearchQuery, CelebritySearchQueryVariables>;
export function useCelebritySearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CelebritySearchQuery, CelebritySearchQueryVariables>): Apollo.UseSuspenseQueryResult<CelebritySearchQuery | undefined, CelebritySearchQueryVariables>;
export function useCelebritySearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CelebritySearchQuery, CelebritySearchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CelebritySearchQuery, CelebritySearchQueryVariables>(CelebritySearchDocument, options);
        }
export type CelebritySearchQueryHookResult = ReturnType<typeof useCelebritySearchQuery>;
export type CelebritySearchLazyQueryHookResult = ReturnType<typeof useCelebritySearchLazyQuery>;
export type CelebritySearchSuspenseQueryHookResult = ReturnType<typeof useCelebritySearchSuspenseQuery>;
export type CelebritySearchQueryResult = Apollo.QueryResult<CelebritySearchQuery, CelebritySearchQueryVariables>;
export const SubjectScrollDocument = gql`
    query SubjectScroll($scroll_id: String!) {
  queryScroll(scroll_id: $scroll_id) {
    ...SubjectSearchResult
  }
}
    ${SubjectSearchResultFragmentDoc}`;

/**
 * __useSubjectScrollQuery__
 *
 * To run a query within a React component, call `useSubjectScrollQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectScrollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectScrollQuery({
 *   variables: {
 *      scroll_id: // value for 'scroll_id'
 *   },
 * });
 */
export function useSubjectScrollQuery(baseOptions: Apollo.QueryHookOptions<SubjectScrollQuery, SubjectScrollQueryVariables> & ({ variables: SubjectScrollQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectScrollQuery, SubjectScrollQueryVariables>(SubjectScrollDocument, options);
      }
export function useSubjectScrollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectScrollQuery, SubjectScrollQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectScrollQuery, SubjectScrollQueryVariables>(SubjectScrollDocument, options);
        }
// @ts-ignore
export function useSubjectScrollSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubjectScrollQuery, SubjectScrollQueryVariables>): Apollo.UseSuspenseQueryResult<SubjectScrollQuery, SubjectScrollQueryVariables>;
export function useSubjectScrollSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubjectScrollQuery, SubjectScrollQueryVariables>): Apollo.UseSuspenseQueryResult<SubjectScrollQuery | undefined, SubjectScrollQueryVariables>;
export function useSubjectScrollSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubjectScrollQuery, SubjectScrollQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubjectScrollQuery, SubjectScrollQueryVariables>(SubjectScrollDocument, options);
        }
export type SubjectScrollQueryHookResult = ReturnType<typeof useSubjectScrollQuery>;
export type SubjectScrollLazyQueryHookResult = ReturnType<typeof useSubjectScrollLazyQuery>;
export type SubjectScrollSuspenseQueryHookResult = ReturnType<typeof useSubjectScrollSuspenseQuery>;
export type SubjectScrollQueryResult = Apollo.QueryResult<SubjectScrollQuery, SubjectScrollQueryVariables>;
export const CelebrityScrollDocument = gql`
    query CelebrityScroll($scroll_id: String!) {
  queryScroll(scroll_id: $scroll_id) {
    ...CelebritySearchResult
  }
}
    ${CelebritySearchResultFragmentDoc}`;

/**
 * __useCelebrityScrollQuery__
 *
 * To run a query within a React component, call `useCelebrityScrollQuery` and pass it any options that fit your needs.
 * When your component renders, `useCelebrityScrollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCelebrityScrollQuery({
 *   variables: {
 *      scroll_id: // value for 'scroll_id'
 *   },
 * });
 */
export function useCelebrityScrollQuery(baseOptions: Apollo.QueryHookOptions<CelebrityScrollQuery, CelebrityScrollQueryVariables> & ({ variables: CelebrityScrollQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CelebrityScrollQuery, CelebrityScrollQueryVariables>(CelebrityScrollDocument, options);
      }
export function useCelebrityScrollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CelebrityScrollQuery, CelebrityScrollQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CelebrityScrollQuery, CelebrityScrollQueryVariables>(CelebrityScrollDocument, options);
        }
// @ts-ignore
export function useCelebrityScrollSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CelebrityScrollQuery, CelebrityScrollQueryVariables>): Apollo.UseSuspenseQueryResult<CelebrityScrollQuery, CelebrityScrollQueryVariables>;
export function useCelebrityScrollSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CelebrityScrollQuery, CelebrityScrollQueryVariables>): Apollo.UseSuspenseQueryResult<CelebrityScrollQuery | undefined, CelebrityScrollQueryVariables>;
export function useCelebrityScrollSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CelebrityScrollQuery, CelebrityScrollQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CelebrityScrollQuery, CelebrityScrollQueryVariables>(CelebrityScrollDocument, options);
        }
export type CelebrityScrollQueryHookResult = ReturnType<typeof useCelebrityScrollQuery>;
export type CelebrityScrollLazyQueryHookResult = ReturnType<typeof useCelebrityScrollLazyQuery>;
export type CelebrityScrollSuspenseQueryHookResult = ReturnType<typeof useCelebrityScrollSuspenseQuery>;
export type CelebrityScrollQueryResult = Apollo.QueryResult<CelebrityScrollQuery, CelebrityScrollQueryVariables>;
export const GetRelatedTagsDocument = gql`
    query GetRelatedTags($tags: [String!]) {
  queryRelatedTags(tags: $tags) {
    ...Tag
  }
}
    ${TagFragmentDoc}`;

/**
 * __useGetRelatedTagsQuery__
 *
 * To run a query within a React component, call `useGetRelatedTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelatedTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelatedTagsQuery({
 *   variables: {
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useGetRelatedTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>(GetRelatedTagsDocument, options);
      }
export function useGetRelatedTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>(GetRelatedTagsDocument, options);
        }
// @ts-ignore
export function useGetRelatedTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>): Apollo.UseSuspenseQueryResult<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>;
export function useGetRelatedTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>): Apollo.UseSuspenseQueryResult<GetRelatedTagsQuery | undefined, GetRelatedTagsQueryVariables>;
export function useGetRelatedTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>(GetRelatedTagsDocument, options);
        }
export type GetRelatedTagsQueryHookResult = ReturnType<typeof useGetRelatedTagsQuery>;
export type GetRelatedTagsLazyQueryHookResult = ReturnType<typeof useGetRelatedTagsLazyQuery>;
export type GetRelatedTagsSuspenseQueryHookResult = ReturnType<typeof useGetRelatedTagsSuspenseQuery>;
export type GetRelatedTagsQueryResult = Apollo.QueryResult<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>;
export const GetBangumiSubjectDocument = gql`
    query GetBangumiSubject($id: Int!, $token: String) {
  queryBangumiSubject(id: $id, token: $token) {
    ...BangumiSubject
  }
}
    ${BangumiSubjectFragmentDoc}`;

/**
 * __useGetBangumiSubjectQuery__
 *
 * To run a query within a React component, call `useGetBangumiSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBangumiSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBangumiSubjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetBangumiSubjectQuery(baseOptions: Apollo.QueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables> & ({ variables: GetBangumiSubjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>(GetBangumiSubjectDocument, options);
      }
export function useGetBangumiSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>(GetBangumiSubjectDocument, options);
        }
// @ts-ignore
export function useGetBangumiSubjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>;
export function useGetBangumiSubjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiSubjectQuery | undefined, GetBangumiSubjectQueryVariables>;
export function useGetBangumiSubjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>(GetBangumiSubjectDocument, options);
        }
export type GetBangumiSubjectQueryHookResult = ReturnType<typeof useGetBangumiSubjectQuery>;
export type GetBangumiSubjectLazyQueryHookResult = ReturnType<typeof useGetBangumiSubjectLazyQuery>;
export type GetBangumiSubjectSuspenseQueryHookResult = ReturnType<typeof useGetBangumiSubjectSuspenseQuery>;
export type GetBangumiSubjectQueryResult = Apollo.QueryResult<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>;
export const GetBangumiPersonDocument = gql`
    query GetBangumiPerson($id: Int!, $token: String) {
  queryBangumiPerson(id: $id, token: $token) {
    ...BangumiPerson
  }
}
    ${BangumiPersonFragmentDoc}`;

/**
 * __useGetBangumiPersonQuery__
 *
 * To run a query within a React component, call `useGetBangumiPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBangumiPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBangumiPersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetBangumiPersonQuery(baseOptions: Apollo.QueryHookOptions<GetBangumiPersonQuery, GetBangumiPersonQueryVariables> & ({ variables: GetBangumiPersonQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>(GetBangumiPersonDocument, options);
      }
export function useGetBangumiPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>(GetBangumiPersonDocument, options);
        }
// @ts-ignore
export function useGetBangumiPersonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>;
export function useGetBangumiPersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiPersonQuery | undefined, GetBangumiPersonQueryVariables>;
export function useGetBangumiPersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>(GetBangumiPersonDocument, options);
        }
export type GetBangumiPersonQueryHookResult = ReturnType<typeof useGetBangumiPersonQuery>;
export type GetBangumiPersonLazyQueryHookResult = ReturnType<typeof useGetBangumiPersonLazyQuery>;
export type GetBangumiPersonSuspenseQueryHookResult = ReturnType<typeof useGetBangumiPersonSuspenseQuery>;
export type GetBangumiPersonQueryResult = Apollo.QueryResult<GetBangumiPersonQuery, GetBangumiPersonQueryVariables>;
export const GetBangumiCharacterDocument = gql`
    query GetBangumiCharacter($id: Int!, $token: String) {
  queryBangumiCharacter(id: $id, token: $token) {
    ...BangumiCharacter
  }
}
    ${BangumiCharacterFragmentDoc}`;

/**
 * __useGetBangumiCharacterQuery__
 *
 * To run a query within a React component, call `useGetBangumiCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBangumiCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBangumiCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetBangumiCharacterQuery(baseOptions: Apollo.QueryHookOptions<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables> & ({ variables: GetBangumiCharacterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>(GetBangumiCharacterDocument, options);
      }
export function useGetBangumiCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>(GetBangumiCharacterDocument, options);
        }
// @ts-ignore
export function useGetBangumiCharacterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>;
export function useGetBangumiCharacterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiCharacterQuery | undefined, GetBangumiCharacterQueryVariables>;
export function useGetBangumiCharacterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>(GetBangumiCharacterDocument, options);
        }
export type GetBangumiCharacterQueryHookResult = ReturnType<typeof useGetBangumiCharacterQuery>;
export type GetBangumiCharacterLazyQueryHookResult = ReturnType<typeof useGetBangumiCharacterLazyQuery>;
export type GetBangumiCharacterSuspenseQueryHookResult = ReturnType<typeof useGetBangumiCharacterSuspenseQuery>;
export type GetBangumiCharacterQueryResult = Apollo.QueryResult<GetBangumiCharacterQuery, GetBangumiCharacterQueryVariables>;
export const GetBangumiMeDocument = gql`
    query GetBangumiMe($token: String!) {
  queryBangumiMe(token: $token) {
    ...BangumiUser
  }
}
    ${BangumiUserFragmentDoc}`;

/**
 * __useGetBangumiMeQuery__
 *
 * To run a query within a React component, call `useGetBangumiMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBangumiMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBangumiMeQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetBangumiMeQuery(baseOptions: Apollo.QueryHookOptions<GetBangumiMeQuery, GetBangumiMeQueryVariables> & ({ variables: GetBangumiMeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBangumiMeQuery, GetBangumiMeQueryVariables>(GetBangumiMeDocument, options);
      }
export function useGetBangumiMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBangumiMeQuery, GetBangumiMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBangumiMeQuery, GetBangumiMeQueryVariables>(GetBangumiMeDocument, options);
        }
// @ts-ignore
export function useGetBangumiMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBangumiMeQuery, GetBangumiMeQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiMeQuery, GetBangumiMeQueryVariables>;
export function useGetBangumiMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiMeQuery, GetBangumiMeQueryVariables>): Apollo.UseSuspenseQueryResult<GetBangumiMeQuery | undefined, GetBangumiMeQueryVariables>;
export function useGetBangumiMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBangumiMeQuery, GetBangumiMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBangumiMeQuery, GetBangumiMeQueryVariables>(GetBangumiMeDocument, options);
        }
export type GetBangumiMeQueryHookResult = ReturnType<typeof useGetBangumiMeQuery>;
export type GetBangumiMeLazyQueryHookResult = ReturnType<typeof useGetBangumiMeLazyQuery>;
export type GetBangumiMeSuspenseQueryHookResult = ReturnType<typeof useGetBangumiMeSuspenseQuery>;
export type GetBangumiMeQueryResult = Apollo.QueryResult<GetBangumiMeQuery, GetBangumiMeQueryVariables>;
export type BangumiCharacterKeySpecifier = ('gender' | 'id' | 'images' | 'infobox' | 'locked' | 'name' | 'stat' | 'summary' | 'type' | BangumiCharacterKeySpecifier)[];
export type BangumiCharacterFieldPolicy = {
	gender?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	infobox?: FieldPolicy<any> | FieldReadFunction<any>,
	locked?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	stat?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BangumiPersonKeySpecifier = ('career' | 'gender' | 'id' | 'images' | 'infobox' | 'last_modified' | 'locked' | 'name' | 'stat' | 'summary' | 'type' | BangumiPersonKeySpecifier)[];
export type BangumiPersonFieldPolicy = {
	career?: FieldPolicy<any> | FieldReadFunction<any>,
	gender?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	infobox?: FieldPolicy<any> | FieldReadFunction<any>,
	last_modified?: FieldPolicy<any> | FieldReadFunction<any>,
	locked?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	stat?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BangumiSubjectKeySpecifier = ('collection' | 'date' | 'eps' | 'id' | 'images' | 'infobox' | 'locked' | 'name' | 'name_cn' | 'nsfw' | 'platform' | 'rating' | 'summary' | 'total_episodes' | 'type' | 'volumes' | BangumiSubjectKeySpecifier)[];
export type BangumiSubjectFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	eps?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	infobox?: FieldPolicy<any> | FieldReadFunction<any>,
	locked?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	name_cn?: FieldPolicy<any> | FieldReadFunction<any>,
	nsfw?: FieldPolicy<any> | FieldReadFunction<any>,
	platform?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	total_episodes?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	volumes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BangumiUserKeySpecifier = ('avatar' | 'email' | 'id' | 'nickname' | 'reg_time' | 'sign' | 'url' | 'user_group' | 'username' | BangumiUserKeySpecifier)[];
export type BangumiUserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	nickname?: FieldPolicy<any> | FieldReadFunction<any>,
	reg_time?: FieldPolicy<any> | FieldReadFunction<any>,
	sign?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	user_group?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CelebrityKeySpecifier = ('alias' | 'id' | 'name' | 'score' | 'type' | CelebrityKeySpecifier)[];
export type CelebrityFieldPolicy = {
	alias?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CelebrityStatKeySpecifier = ('collects' | 'comments' | CelebrityStatKeySpecifier)[];
export type CelebrityStatFieldPolicy = {
	collects?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionKeySpecifier = ('collect' | 'doing' | 'dropped' | 'on_hold' | 'wish' | CollectionKeySpecifier)[];
export type CollectionFieldPolicy = {
	collect?: FieldPolicy<any> | FieldReadFunction<any>,
	doing?: FieldPolicy<any> | FieldReadFunction<any>,
	dropped?: FieldPolicy<any> | FieldReadFunction<any>,
	on_hold?: FieldPolicy<any> | FieldReadFunction<any>,
	wish?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImagesKeySpecifier = ('large' | 'medium' | 'small' | ImagesKeySpecifier)[];
export type ImagesFieldPolicy = {
	large?: FieldPolicy<any> | FieldReadFunction<any>,
	medium?: FieldPolicy<any> | FieldReadFunction<any>,
	small?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InfoKeySpecifier = ('key' | 'value' | InfoKeySpecifier)[];
export type InfoFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InfoValueKeySpecifier = ('list' | 'property' | InfoValueKeySpecifier)[];
export type InfoValueFieldPolicy = {
	list?: FieldPolicy<any> | FieldReadFunction<any>,
	property?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemKeySpecifier = ('key' | 'value' | ItemKeySpecifier)[];
export type ItemFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type KVKeySpecifier = ('k' | 'v' | KVKeySpecifier)[];
export type KVFieldPolicy = {
	k?: FieldPolicy<any> | FieldReadFunction<any>,
	v?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('queryAutoComplete' | 'queryBangumiCharacter' | 'queryBangumiMe' | 'queryBangumiPerson' | 'queryBangumiSubject' | 'queryCelebritySearch' | 'queryRankingDate' | 'queryRankingList' | 'queryRelatedTags' | 'queryScroll' | 'querySubjectSearch' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	queryAutoComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiCharacter?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiMe?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiPerson?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiSubject?: FieldPolicy<any> | FieldReadFunction<any>,
	queryCelebritySearch?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingDate?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingList?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRelatedTags?: FieldPolicy<any> | FieldReadFunction<any>,
	queryScroll?: FieldPolicy<any> | FieldReadFunction<any>,
	querySubjectSearch?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RatingKeySpecifier = ('count' | 'rank' | 'score' | 'total' | RatingKeySpecifier)[];
export type RatingFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchResultKeySpecifier = ('result' | 'scroll_id' | 'timed_out' | 'took' | 'total' | SearchResultKeySpecifier)[];
export type SearchResultFieldPolicy = {
	result?: FieldPolicy<any> | FieldReadFunction<any>,
	scroll_id?: FieldPolicy<any> | FieldReadFunction<any>,
	timed_out?: FieldPolicy<any> | FieldReadFunction<any>,
	took?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubjectKeySpecifier = ('avgscore' | 'date' | 'id' | 'name' | 'nameCN' | 'nsfw' | 'platform' | 'rank' | 'scientificRank' | 'score' | 'summary' | 'tags' | 'type' | SubjectKeySpecifier)[];
export type SubjectFieldPolicy = {
	avgscore?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nameCN?: FieldPolicy<any> | FieldReadFunction<any>,
	nsfw?: FieldPolicy<any> | FieldReadFunction<any>,
	platform?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>,
	scientificRank?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TagKeySpecifier = ('confidence' | 'content' | 'userCount' | TagKeySpecifier)[];
export type TagFieldPolicy = {
	confidence?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	userCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BangumiCharacter?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BangumiCharacterKeySpecifier | (() => undefined | BangumiCharacterKeySpecifier),
		fields?: BangumiCharacterFieldPolicy,
	},
	BangumiPerson?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BangumiPersonKeySpecifier | (() => undefined | BangumiPersonKeySpecifier),
		fields?: BangumiPersonFieldPolicy,
	},
	BangumiSubject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BangumiSubjectKeySpecifier | (() => undefined | BangumiSubjectKeySpecifier),
		fields?: BangumiSubjectFieldPolicy,
	},
	BangumiUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BangumiUserKeySpecifier | (() => undefined | BangumiUserKeySpecifier),
		fields?: BangumiUserFieldPolicy,
	},
	Celebrity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CelebrityKeySpecifier | (() => undefined | CelebrityKeySpecifier),
		fields?: CelebrityFieldPolicy,
	},
	CelebrityStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CelebrityStatKeySpecifier | (() => undefined | CelebrityStatKeySpecifier),
		fields?: CelebrityStatFieldPolicy,
	},
	Collection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionKeySpecifier | (() => undefined | CollectionKeySpecifier),
		fields?: CollectionFieldPolicy,
	},
	Images?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImagesKeySpecifier | (() => undefined | ImagesKeySpecifier),
		fields?: ImagesFieldPolicy,
	},
	Info?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InfoKeySpecifier | (() => undefined | InfoKeySpecifier),
		fields?: InfoFieldPolicy,
	},
	InfoValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InfoValueKeySpecifier | (() => undefined | InfoValueKeySpecifier),
		fields?: InfoValueFieldPolicy,
	},
	Item?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemKeySpecifier | (() => undefined | ItemKeySpecifier),
		fields?: ItemFieldPolicy,
	},
	KV?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | KVKeySpecifier | (() => undefined | KVKeySpecifier),
		fields?: KVFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Rating?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RatingKeySpecifier | (() => undefined | RatingKeySpecifier),
		fields?: RatingFieldPolicy,
	},
	SearchResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchResultKeySpecifier | (() => undefined | SearchResultKeySpecifier),
		fields?: SearchResultFieldPolicy,
	},
	Subject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubjectKeySpecifier | (() => undefined | SubjectKeySpecifier),
		fields?: SubjectFieldPolicy,
	},
	Tag?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TagKeySpecifier | (() => undefined | TagKeySpecifier),
		fields?: TagFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;