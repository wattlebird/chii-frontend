import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BriefTag = {
  __typename?: 'BriefTag';
  tag: Scalars['String'];
  coverage: Scalars['Int'];
  confidence: Scalars['Float'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Query = {
  __typename?: 'Query';
  queryRankingDate?: Maybe<Scalars['String']>;
  queryRankingList?: Maybe<Array<Maybe<Subject>>>;
  queryRankingCount?: Maybe<Scalars['Int']>;
  getTagList?: Maybe<Array<Maybe<BriefTag>>>;
  searchByTag?: Maybe<Array<Maybe<Subject>>>;
  searchRelatedTags?: Maybe<Array<Maybe<BriefTag>>>;
};


export type QueryQueryRankingListArgs = {
  bysci?: Maybe<Scalars['Boolean']>;
  from?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['Int']>;
};


export type QuerySearchByTagArgs = {
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  minVoters?: Maybe<Scalars['Int']>;
  minFavs?: Maybe<Scalars['Int']>;
};


export type QuerySearchRelatedTagsArgs = {
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['ID'];
  name: Scalars['String'];
  nameCN?: Maybe<Scalars['String']>;
  type: SubjectType;
  rank?: Maybe<Scalars['Int']>;
  sciRank?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
  votenum: Scalars['Int'];
  favnum: Scalars['Int'];
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export enum SubjectType {
  Anime = 'ANIME',
  Book = 'BOOK',
  Game = 'GAME',
  Music = 'MUSIC',
  Real = 'REAL'
}

export type Tag = {
  __typename?: 'Tag';
  tag: Scalars['String'];
  tagCount: Scalars['Int'];
  userCount: Scalars['Int'];
  confidence: Scalars['Float'];
};


export type GetRankingDateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRankingDateQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'queryRankingDate'>
);

export type GetRankingCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRankingCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'queryRankingCount'>
);

export type GetRankingListQueryVariables = Exact<{
  bysci?: Maybe<Scalars['Boolean']>;
  from?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['Int']>;
}>;


export type GetRankingListQuery = (
  { __typename?: 'Query' }
  & { queryRankingList?: Maybe<Array<Maybe<(
    { __typename?: 'Subject' }
    & SubjectFragment
  )>>> }
);

export type GetTagListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagListQuery = (
  { __typename?: 'Query' }
  & { getTagList?: Maybe<Array<Maybe<(
    { __typename?: 'BriefTag' }
    & BriefTagFragment
  )>>> }
);

export type SearchSubjectByTagQueryVariables = Exact<{
  tags: Array<Scalars['String']> | Scalars['String'];
  minFavs?: Maybe<Scalars['Int']>;
  minVoters?: Maybe<Scalars['Int']>;
}>;


export type SearchSubjectByTagQuery = (
  { __typename?: 'Query' }
  & { searchByTag?: Maybe<Array<Maybe<(
    { __typename?: 'Subject' }
    & SubjectFragment
  )>>> }
);

export type SearchRelatedTagsQueryVariables = Exact<{
  tags: Array<Scalars['String']> | Scalars['String'];
}>;


export type SearchRelatedTagsQuery = (
  { __typename?: 'Query' }
  & { searchRelatedTags?: Maybe<Array<Maybe<(
    { __typename?: 'BriefTag' }
    & BriefTagFragment
  )>>> }
);

export type SubjectFragment = (
  { __typename?: 'Subject' }
  & Pick<Subject, 'id' | 'date' | 'name' | 'nameCN' | 'rank' | 'sciRank' | 'type' | 'votenum' | 'favnum'>
  & { tags?: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & TagFragment
  )>>> }
);

export type TagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'tag' | 'tagCount' | 'userCount' | 'confidence'>
);

export type BriefTagFragment = (
  { __typename?: 'BriefTag' }
  & Pick<BriefTag, 'tag' | 'coverage'>
);

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  tag
  tagCount
  userCount
  confidence
}
    `;
export const SubjectFragmentDoc = gql`
    fragment Subject on Subject {
  id
  date
  name
  nameCN
  rank
  sciRank
  type
  votenum
  favnum
  tags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const BriefTagFragmentDoc = gql`
    fragment BriefTag on BriefTag {
  tag
  coverage
}
    `;
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
export const GetRankingCountDocument = gql`
    query GetRankingCount {
  queryRankingCount
}
    `;

/**
 * __useGetRankingCountQuery__
 *
 * To run a query within a React component, call `useGetRankingCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRankingCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRankingCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRankingCountQuery(baseOptions?: Apollo.QueryHookOptions<GetRankingCountQuery, GetRankingCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRankingCountQuery, GetRankingCountQueryVariables>(GetRankingCountDocument, options);
      }
export function useGetRankingCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRankingCountQuery, GetRankingCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRankingCountQuery, GetRankingCountQueryVariables>(GetRankingCountDocument, options);
        }
export type GetRankingCountQueryHookResult = ReturnType<typeof useGetRankingCountQuery>;
export type GetRankingCountLazyQueryHookResult = ReturnType<typeof useGetRankingCountLazyQuery>;
export type GetRankingCountQueryResult = Apollo.QueryResult<GetRankingCountQuery, GetRankingCountQueryVariables>;
export const GetRankingListDocument = gql`
    query GetRankingList($bysci: Boolean, $from: Int, $step: Int) {
  queryRankingList(bysci: $bysci, from: $from, step: $step) {
    ...Subject
  }
}
    ${SubjectFragmentDoc}`;

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
 *      bysci: // value for 'bysci'
 *      from: // value for 'from'
 *      step: // value for 'step'
 *   },
 * });
 */
export function useGetRankingListQuery(baseOptions?: Apollo.QueryHookOptions<GetRankingListQuery, GetRankingListQueryVariables>) {
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
export const GetTagListDocument = gql`
    query GetTagList {
  getTagList {
    ...BriefTag
  }
}
    ${BriefTagFragmentDoc}`;

/**
 * __useGetTagListQuery__
 *
 * To run a query within a React component, call `useGetTagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagListQuery(baseOptions?: Apollo.QueryHookOptions<GetTagListQuery, GetTagListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagListQuery, GetTagListQueryVariables>(GetTagListDocument, options);
      }
export function useGetTagListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagListQuery, GetTagListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagListQuery, GetTagListQueryVariables>(GetTagListDocument, options);
        }
export type GetTagListQueryHookResult = ReturnType<typeof useGetTagListQuery>;
export type GetTagListLazyQueryHookResult = ReturnType<typeof useGetTagListLazyQuery>;
export type GetTagListQueryResult = Apollo.QueryResult<GetTagListQuery, GetTagListQueryVariables>;
export const SearchSubjectByTagDocument = gql`
    query SearchSubjectByTag($tags: [String!]!, $minFavs: Int, $minVoters: Int) {
  searchByTag(tags: $tags, minFavs: $minFavs, minVoters: $minVoters) {
    ...Subject
  }
}
    ${SubjectFragmentDoc}`;

/**
 * __useSearchSubjectByTagQuery__
 *
 * To run a query within a React component, call `useSearchSubjectByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSubjectByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSubjectByTagQuery({
 *   variables: {
 *      tags: // value for 'tags'
 *      minFavs: // value for 'minFavs'
 *      minVoters: // value for 'minVoters'
 *   },
 * });
 */
export function useSearchSubjectByTagQuery(baseOptions: Apollo.QueryHookOptions<SearchSubjectByTagQuery, SearchSubjectByTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchSubjectByTagQuery, SearchSubjectByTagQueryVariables>(SearchSubjectByTagDocument, options);
      }
export function useSearchSubjectByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSubjectByTagQuery, SearchSubjectByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchSubjectByTagQuery, SearchSubjectByTagQueryVariables>(SearchSubjectByTagDocument, options);
        }
export type SearchSubjectByTagQueryHookResult = ReturnType<typeof useSearchSubjectByTagQuery>;
export type SearchSubjectByTagLazyQueryHookResult = ReturnType<typeof useSearchSubjectByTagLazyQuery>;
export type SearchSubjectByTagQueryResult = Apollo.QueryResult<SearchSubjectByTagQuery, SearchSubjectByTagQueryVariables>;
export const SearchRelatedTagsDocument = gql`
    query SearchRelatedTags($tags: [String!]!) {
  searchRelatedTags(tags: $tags) {
    ...BriefTag
  }
}
    ${BriefTagFragmentDoc}`;

/**
 * __useSearchRelatedTagsQuery__
 *
 * To run a query within a React component, call `useSearchRelatedTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRelatedTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRelatedTagsQuery({
 *   variables: {
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useSearchRelatedTagsQuery(baseOptions: Apollo.QueryHookOptions<SearchRelatedTagsQuery, SearchRelatedTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRelatedTagsQuery, SearchRelatedTagsQueryVariables>(SearchRelatedTagsDocument, options);
      }
export function useSearchRelatedTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRelatedTagsQuery, SearchRelatedTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRelatedTagsQuery, SearchRelatedTagsQueryVariables>(SearchRelatedTagsDocument, options);
        }
export type SearchRelatedTagsQueryHookResult = ReturnType<typeof useSearchRelatedTagsQuery>;
export type SearchRelatedTagsLazyQueryHookResult = ReturnType<typeof useSearchRelatedTagsLazyQuery>;
export type SearchRelatedTagsQueryResult = Apollo.QueryResult<SearchRelatedTagsQuery, SearchRelatedTagsQueryVariables>;