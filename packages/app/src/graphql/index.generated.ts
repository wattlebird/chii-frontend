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
  common: Scalars['String']['output'];
  grid: Scalars['String']['output'];
  large: Scalars['String']['output'];
  medium: Scalars['String']['output'];
  small: Scalars['String']['output'];
};

export type Info = {
  __typename?: 'Info';
  key: Scalars['String']['output'];
  value?: Maybe<InfoValue>;
};

export type InfoBox = {
  __typename?: 'InfoBox';
  channel?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  date_onair?: Maybe<Scalars['String']['output']>;
  date_onair_end?: Maybe<Scalars['String']['output']>;
  date_release?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  gametype?: Maybe<Scalars['String']['output']>;
  isbn?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['String']['output']>;
  length_per_episode?: Maybe<Scalars['String']['output']>;
  magazine?: Maybe<Scalars['String']['output']>;
  name_cn?: Maybe<Scalars['String']['output']>;
  num_disks?: Maybe<Scalars['String']['output']>;
  num_episodes?: Maybe<Scalars['String']['output']>;
  num_pages?: Maybe<Scalars['String']['output']>;
  num_players?: Maybe<Scalars['String']['output']>;
  num_volumes?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  publisher_other?: Maybe<Scalars['String']['output']>;
  recorder?: Maybe<Scalars['String']['output']>;
  showtype?: Maybe<Scalars['String']['output']>;
  tvnetwork?: Maybe<Scalars['String']['output']>;
  tvstation?: Maybe<Scalars['String']['output']>;
  tvstation_other?: Maybe<Scalars['String']['output']>;
  version_characteristics?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  week_onair?: Maybe<Scalars['String']['output']>;
  year_onair?: Maybe<Scalars['String']['output']>;
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
  /** Search subjects given query, tags, type and date range */
  queryAdvancedSearch?: Maybe<SearchResult>;
  /** Auto complete a tag prefix, at most 10 results would be returned */
  queryAutoComplete?: Maybe<Array<Scalars['String']['output']>>;
  /** Wrapper of bangumi /subject API */
  queryBangumiSubject?: Maybe<BangumiSubject>;
  /** Get current custom ranking generation date */
  queryRankingDate: Scalars['String']['output'];
  /** Get current custom ranking list. */
  queryRankingList?: Maybe<SearchResult>;
  /**
   * WARNING: TO BE DEPRECATED
   * Search subjects by tags
   */
  queryRelatedSubjects?: Maybe<SearchResult>;
  /** Search tags related to given tags */
  queryRelatedTags?: Maybe<Array<Tag>>;
  /**
   * Scroll a search result.
   * This query should be involked after `querySearch`, `queryAdvancedSearch` and `queryRelatedSubjects`
   */
  queryScroll?: Maybe<SearchResult>;
  /** Search subjects by query */
  querySearch?: Maybe<SearchResult>;
  /** Get subject given subject ID */
  querySubject?: Maybe<Subject>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryAdvancedSearchArgs = {
  dateRange?: InputMaybe<DateRange>;
  q?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryAutoCompleteArgs = {
  fields?: InputMaybe<Scalars['String']['input']>;
  q: Scalars['String']['input'];
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryBangumiSubjectArgs = {
  id: Scalars['Int']['input'];
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryRankingListArgs = {
  type: Scalars['String']['input'];
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQueryRelatedSubjectsArgs = {
  q: Scalars['String']['input'];
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
export type QueryQuerySearchArgs = {
  q: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of chii.ai's GraphQL interface. */
export type QueryQuerySubjectArgs = {
  id: Scalars['Int']['input'];
};

export type Rating = {
  __typename?: 'Rating';
  count: Array<Maybe<Scalars['Int']['output']>>;
  rank: Scalars['Int']['output'];
  score: Scalars['Float']['output'];
  total: Scalars['Int']['output'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  result: Array<Subject>;
  scroll_id?: Maybe<Scalars['String']['output']>;
  timed_out: Scalars['Boolean']['output'];
  took: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type Subject = {
  __typename?: 'Subject';
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


export type GetRankingListQuery = { __typename?: 'Query', queryRankingList?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }> } | null };

export type GetAutoCompleteQueryVariables = Exact<{
  q: Scalars['String']['input'];
  fields?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAutoCompleteQuery = { __typename?: 'Query', queryAutoComplete?: Array<string> | null };

export type GetRelatedSubjectsQueryVariables = Exact<{
  q: Scalars['String']['input'];
}>;


export type GetRelatedSubjectsQuery = { __typename?: 'Query', queryRelatedSubjects?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }> } | null };

export type SearchQueryVariables = Exact<{
  q: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchQuery = { __typename?: 'Query', querySearch?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }> } | null };

export type AdvancedSearchQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  dateRange?: InputMaybe<DateRange>;
}>;


export type AdvancedSearchQuery = { __typename?: 'Query', queryAdvancedSearch?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }> } | null };

export type ScrollQueryVariables = Exact<{
  scroll_id: Scalars['String']['input'];
}>;


export type ScrollQuery = { __typename?: 'Query', queryScroll?: { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }> } | null };

export type GetRelatedTagsQueryVariables = Exact<{
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetRelatedTagsQuery = { __typename?: 'Query', queryRelatedTags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null };

export type GetSubjectQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSubjectQuery = { __typename?: 'Query', querySubject?: { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null } | null };

export type GetBangumiSubjectQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBangumiSubjectQuery = { __typename?: 'Query', queryBangumiSubject?: { __typename?: 'BangumiSubject', id: string, type: string, name: string, name_cn: string, summary: string, nsfw: boolean, locked: boolean, date?: string | null, platform: string, volumes: number, eps: number, total_episodes: number, images: { __typename?: 'Images', large: string, common: string, medium: string, small: string, grid: string }, rating: { __typename?: 'Rating', rank: number, total: number, count: Array<number | null>, score: number }, collection: { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number }, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null } | null };

export type TagFragment = { __typename?: 'Tag', content: string, userCount: number, confidence: number };

export type SubjectFragment = { __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null };

export type ImagesFragment = { __typename?: 'Images', large: string, common: string, medium: string, small: string, grid: string };

export type ItemFragment = { __typename?: 'Item', key: string, value: string };

export type RatingFragment = { __typename?: 'Rating', rank: number, total: number, count: Array<number | null>, score: number };

export type CollectionFragment = { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number };

export type KvFragment = { __typename?: 'KV', k?: string | null, v: string };

export type InfoValueFragment = { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null };

export type InfoFragment = { __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null };

export type InfoBoxFragment = { __typename?: 'InfoBox', name_cn?: string | null, num_episodes?: string | null, week_onair?: string | null, date_onair?: string | null, date_onair_end?: string | null, showtype?: string | null, country?: string | null, language?: string | null, length_per_episode?: string | null, channel?: string | null, tvnetwork?: string | null, tvstation?: string | null, website?: string | null, gametype?: string | null, engine?: string | null, num_players?: string | null, date_release?: string | null, price?: string | null, version_characteristics?: string | null, length?: string | null, recorder?: string | null, num_disks?: string | null, tvstation_other?: string | null, copyright?: string | null, year_onair?: string | null, publisher?: string | null, publisher_other?: string | null, magazine?: string | null, num_volumes?: string | null, num_pages?: string | null, isbn?: string | null };

export type BangumiSubjectFragment = { __typename?: 'BangumiSubject', id: string, type: string, name: string, name_cn: string, summary: string, nsfw: boolean, locked: boolean, date?: string | null, platform: string, volumes: number, eps: number, total_episodes: number, images: { __typename?: 'Images', large: string, common: string, medium: string, small: string, grid: string }, rating: { __typename?: 'Rating', rank: number, total: number, count: Array<number | null>, score: number }, collection: { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number }, infobox?: Array<{ __typename?: 'Info', key: string, value?: { __typename?: 'InfoValue', property?: string | null, list?: Array<{ __typename?: 'KV', k?: string | null, v: string } | null> | null } | null } | null> | null };

export type SearchResultFragment = { __typename?: 'SearchResult', scroll_id?: string | null, took: number, timed_out: boolean, total?: number | null, result: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null, rank?: number | null, type?: string | null, score?: Array<number | null> | null, scientificRank?: number | null, date?: string | null, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null }> };

export const ItemFragmentDoc = gql`
    fragment Item on Item {
  key
  value
}
    `;
export const InfoBoxFragmentDoc = gql`
    fragment InfoBox on InfoBox {
  name_cn
  num_episodes
  week_onair
  date_onair
  date_onair_end
  showtype
  country
  language
  length_per_episode
  channel
  tvnetwork
  tvstation
  website
  gametype
  engine
  num_players
  date_release
  price
  version_characteristics
  length
  recorder
  num_disks
  tvstation_other
  copyright
  year_onair
  publisher
  publisher_other
  magazine
  num_volumes
  num_pages
  isbn
}
    `;
export const ImagesFragmentDoc = gql`
    fragment Images on Images {
  large
  common
  medium
  small
  grid
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
export const SearchResultFragmentDoc = gql`
    fragment SearchResult on SearchResult {
  scroll_id
  took
  timed_out
  total
  result {
    ...Subject
  }
}
    ${SubjectFragmentDoc}`;
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
export type GetRankingDateQueryHookResult = ReturnType<typeof useGetRankingDateQuery>;
export type GetRankingDateLazyQueryHookResult = ReturnType<typeof useGetRankingDateLazyQuery>;
export type GetRankingDateQueryResult = Apollo.QueryResult<GetRankingDateQuery, GetRankingDateQueryVariables>;
export const GetRankingListDocument = gql`
    query GetRankingList($type: String!) {
  queryRankingList(type: $type) {
    ...SearchResult
  }
}
    ${SearchResultFragmentDoc}`;

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
export function useGetRankingListQuery(baseOptions: Apollo.QueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, options);
      }
export function useGetRankingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, options);
        }
export type GetRankingListQueryHookResult = ReturnType<typeof useGetRankingListQuery>;
export type GetRankingListLazyQueryHookResult = ReturnType<typeof useGetRankingListLazyQuery>;
export type GetRankingListQueryResult = Apollo.QueryResult<GetRankingListQuery, GetRankingListQueryVariables>;
export const GetAutoCompleteDocument = gql`
    query GetAutoComplete($q: String!, $fields: String) {
  queryAutoComplete(q: $q, fields: $fields)
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
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useGetAutoCompleteQuery(baseOptions: Apollo.QueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>(GetAutoCompleteDocument, options);
      }
export function useGetAutoCompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>(GetAutoCompleteDocument, options);
        }
export type GetAutoCompleteQueryHookResult = ReturnType<typeof useGetAutoCompleteQuery>;
export type GetAutoCompleteLazyQueryHookResult = ReturnType<typeof useGetAutoCompleteLazyQuery>;
export type GetAutoCompleteQueryResult = Apollo.QueryResult<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>;
export const GetRelatedSubjectsDocument = gql`
    query GetRelatedSubjects($q: String!) {
  queryRelatedSubjects(q: $q) {
    ...SearchResult
  }
}
    ${SearchResultFragmentDoc}`;

/**
 * __useGetRelatedSubjectsQuery__
 *
 * To run a query within a React component, call `useGetRelatedSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelatedSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelatedSubjectsQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useGetRelatedSubjectsQuery(baseOptions: Apollo.QueryHookOptions<GetRelatedSubjectsQuery, GetRelatedSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelatedSubjectsQuery, GetRelatedSubjectsQueryVariables>(GetRelatedSubjectsDocument, options);
      }
export function useGetRelatedSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelatedSubjectsQuery, GetRelatedSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelatedSubjectsQuery, GetRelatedSubjectsQueryVariables>(GetRelatedSubjectsDocument, options);
        }
export type GetRelatedSubjectsQueryHookResult = ReturnType<typeof useGetRelatedSubjectsQuery>;
export type GetRelatedSubjectsLazyQueryHookResult = ReturnType<typeof useGetRelatedSubjectsLazyQuery>;
export type GetRelatedSubjectsQueryResult = Apollo.QueryResult<GetRelatedSubjectsQuery, GetRelatedSubjectsQueryVariables>;
export const SearchDocument = gql`
    query Search($q: String!, $type: String) {
  querySearch(q: $q, type: $type) {
    ...SearchResult
  }
}
    ${SearchResultFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const AdvancedSearchDocument = gql`
    query AdvancedSearch($q: String, $tags: [String!], $type: String, $dateRange: DateRange) {
  queryAdvancedSearch(q: $q, tags: $tags, type: $type, dateRange: $dateRange) {
    ...SearchResult
  }
}
    ${SearchResultFragmentDoc}`;

/**
 * __useAdvancedSearchQuery__
 *
 * To run a query within a React component, call `useAdvancedSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvancedSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvancedSearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *      tags: // value for 'tags'
 *      type: // value for 'type'
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useAdvancedSearchQuery(baseOptions?: Apollo.QueryHookOptions<AdvancedSearchQuery, AdvancedSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdvancedSearchQuery, AdvancedSearchQueryVariables>(AdvancedSearchDocument, options);
      }
export function useAdvancedSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdvancedSearchQuery, AdvancedSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdvancedSearchQuery, AdvancedSearchQueryVariables>(AdvancedSearchDocument, options);
        }
export type AdvancedSearchQueryHookResult = ReturnType<typeof useAdvancedSearchQuery>;
export type AdvancedSearchLazyQueryHookResult = ReturnType<typeof useAdvancedSearchLazyQuery>;
export type AdvancedSearchQueryResult = Apollo.QueryResult<AdvancedSearchQuery, AdvancedSearchQueryVariables>;
export const ScrollDocument = gql`
    query Scroll($scroll_id: String!) {
  queryScroll(scroll_id: $scroll_id) {
    ...SearchResult
  }
}
    ${SearchResultFragmentDoc}`;

/**
 * __useScrollQuery__
 *
 * To run a query within a React component, call `useScrollQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrollQuery({
 *   variables: {
 *      scroll_id: // value for 'scroll_id'
 *   },
 * });
 */
export function useScrollQuery(baseOptions: Apollo.QueryHookOptions<ScrollQuery, ScrollQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScrollQuery, ScrollQueryVariables>(ScrollDocument, options);
      }
export function useScrollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScrollQuery, ScrollQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScrollQuery, ScrollQueryVariables>(ScrollDocument, options);
        }
export type ScrollQueryHookResult = ReturnType<typeof useScrollQuery>;
export type ScrollLazyQueryHookResult = ReturnType<typeof useScrollLazyQuery>;
export type ScrollQueryResult = Apollo.QueryResult<ScrollQuery, ScrollQueryVariables>;
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
export type GetRelatedTagsQueryHookResult = ReturnType<typeof useGetRelatedTagsQuery>;
export type GetRelatedTagsLazyQueryHookResult = ReturnType<typeof useGetRelatedTagsLazyQuery>;
export type GetRelatedTagsQueryResult = Apollo.QueryResult<GetRelatedTagsQuery, GetRelatedTagsQueryVariables>;
export const GetSubjectDocument = gql`
    query GetSubject($id: Int!) {
  querySubject(id: $id) {
    ...Subject
  }
}
    ${SubjectFragmentDoc}`;

/**
 * __useGetSubjectQuery__
 *
 * To run a query within a React component, call `useGetSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSubjectQuery(baseOptions: Apollo.QueryHookOptions<GetSubjectQuery, GetSubjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectQuery, GetSubjectQueryVariables>(GetSubjectDocument, options);
      }
export function useGetSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectQuery, GetSubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectQuery, GetSubjectQueryVariables>(GetSubjectDocument, options);
        }
export type GetSubjectQueryHookResult = ReturnType<typeof useGetSubjectQuery>;
export type GetSubjectLazyQueryHookResult = ReturnType<typeof useGetSubjectLazyQuery>;
export type GetSubjectQueryResult = Apollo.QueryResult<GetSubjectQuery, GetSubjectQueryVariables>;
export const GetBangumiSubjectDocument = gql`
    query GetBangumiSubject($id: Int!) {
  queryBangumiSubject(id: $id) {
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
 *   },
 * });
 */
export function useGetBangumiSubjectQuery(baseOptions: Apollo.QueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>(GetBangumiSubjectDocument, options);
      }
export function useGetBangumiSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>(GetBangumiSubjectDocument, options);
        }
export type GetBangumiSubjectQueryHookResult = ReturnType<typeof useGetBangumiSubjectQuery>;
export type GetBangumiSubjectLazyQueryHookResult = ReturnType<typeof useGetBangumiSubjectLazyQuery>;
export type GetBangumiSubjectQueryResult = Apollo.QueryResult<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>;
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
export type CollectionKeySpecifier = ('collect' | 'doing' | 'dropped' | 'on_hold' | 'wish' | CollectionKeySpecifier)[];
export type CollectionFieldPolicy = {
	collect?: FieldPolicy<any> | FieldReadFunction<any>,
	doing?: FieldPolicy<any> | FieldReadFunction<any>,
	dropped?: FieldPolicy<any> | FieldReadFunction<any>,
	on_hold?: FieldPolicy<any> | FieldReadFunction<any>,
	wish?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImagesKeySpecifier = ('common' | 'grid' | 'large' | 'medium' | 'small' | ImagesKeySpecifier)[];
export type ImagesFieldPolicy = {
	common?: FieldPolicy<any> | FieldReadFunction<any>,
	grid?: FieldPolicy<any> | FieldReadFunction<any>,
	large?: FieldPolicy<any> | FieldReadFunction<any>,
	medium?: FieldPolicy<any> | FieldReadFunction<any>,
	small?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InfoKeySpecifier = ('key' | 'value' | InfoKeySpecifier)[];
export type InfoFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InfoBoxKeySpecifier = ('channel' | 'copyright' | 'country' | 'date_onair' | 'date_onair_end' | 'date_release' | 'engine' | 'gametype' | 'isbn' | 'language' | 'length' | 'length_per_episode' | 'magazine' | 'name_cn' | 'num_disks' | 'num_episodes' | 'num_pages' | 'num_players' | 'num_volumes' | 'price' | 'publisher' | 'publisher_other' | 'recorder' | 'showtype' | 'tvnetwork' | 'tvstation' | 'tvstation_other' | 'version_characteristics' | 'website' | 'week_onair' | 'year_onair' | InfoBoxKeySpecifier)[];
export type InfoBoxFieldPolicy = {
	channel?: FieldPolicy<any> | FieldReadFunction<any>,
	copyright?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	date_onair?: FieldPolicy<any> | FieldReadFunction<any>,
	date_onair_end?: FieldPolicy<any> | FieldReadFunction<any>,
	date_release?: FieldPolicy<any> | FieldReadFunction<any>,
	engine?: FieldPolicy<any> | FieldReadFunction<any>,
	gametype?: FieldPolicy<any> | FieldReadFunction<any>,
	isbn?: FieldPolicy<any> | FieldReadFunction<any>,
	language?: FieldPolicy<any> | FieldReadFunction<any>,
	length?: FieldPolicy<any> | FieldReadFunction<any>,
	length_per_episode?: FieldPolicy<any> | FieldReadFunction<any>,
	magazine?: FieldPolicy<any> | FieldReadFunction<any>,
	name_cn?: FieldPolicy<any> | FieldReadFunction<any>,
	num_disks?: FieldPolicy<any> | FieldReadFunction<any>,
	num_episodes?: FieldPolicy<any> | FieldReadFunction<any>,
	num_pages?: FieldPolicy<any> | FieldReadFunction<any>,
	num_players?: FieldPolicy<any> | FieldReadFunction<any>,
	num_volumes?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	publisher?: FieldPolicy<any> | FieldReadFunction<any>,
	publisher_other?: FieldPolicy<any> | FieldReadFunction<any>,
	recorder?: FieldPolicy<any> | FieldReadFunction<any>,
	showtype?: FieldPolicy<any> | FieldReadFunction<any>,
	tvnetwork?: FieldPolicy<any> | FieldReadFunction<any>,
	tvstation?: FieldPolicy<any> | FieldReadFunction<any>,
	tvstation_other?: FieldPolicy<any> | FieldReadFunction<any>,
	version_characteristics?: FieldPolicy<any> | FieldReadFunction<any>,
	website?: FieldPolicy<any> | FieldReadFunction<any>,
	week_onair?: FieldPolicy<any> | FieldReadFunction<any>,
	year_onair?: FieldPolicy<any> | FieldReadFunction<any>
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
export type QueryKeySpecifier = ('queryAdvancedSearch' | 'queryAutoComplete' | 'queryBangumiSubject' | 'queryRankingDate' | 'queryRankingList' | 'queryRelatedSubjects' | 'queryRelatedTags' | 'queryScroll' | 'querySearch' | 'querySubject' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	queryAdvancedSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	queryAutoComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiSubject?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingDate?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingList?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRelatedSubjects?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRelatedTags?: FieldPolicy<any> | FieldReadFunction<any>,
	queryScroll?: FieldPolicy<any> | FieldReadFunction<any>,
	querySearch?: FieldPolicy<any> | FieldReadFunction<any>,
	querySubject?: FieldPolicy<any> | FieldReadFunction<any>
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
export type SubjectKeySpecifier = ('date' | 'id' | 'name' | 'nameCN' | 'nsfw' | 'platform' | 'rank' | 'scientificRank' | 'score' | 'summary' | 'tags' | 'type' | SubjectKeySpecifier)[];
export type SubjectFieldPolicy = {
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
	BangumiSubject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BangumiSubjectKeySpecifier | (() => undefined | BangumiSubjectKeySpecifier),
		fields?: BangumiSubjectFieldPolicy,
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
	InfoBox?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InfoBoxKeySpecifier | (() => undefined | InfoBoxKeySpecifier),
		fields?: InfoBoxFieldPolicy,
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