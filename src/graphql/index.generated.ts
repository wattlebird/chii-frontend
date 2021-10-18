import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
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

export type ImageUrls = {
  __typename?: 'ImageUrls';
  large: Scalars['String'];
  common: Scalars['String'];
  medium: Scalars['String'];
  small: Scalars['String'];
  grid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  queryRankingDate?: Maybe<Scalars['String']>;
  queryRankingList?: Maybe<Array<Maybe<Subject>>>;
  queryRankingCount?: Maybe<Scalars['Int']>;
  querySubject?: Maybe<Subject>;
  getTagList?: Maybe<Array<Maybe<BriefTag>>>;
  searchByTag?: Maybe<Array<Maybe<Subject>>>;
  searchRelatedTags?: Maybe<Array<Maybe<BriefTag>>>;
  queryBangumiSubject?: Maybe<SubjectSmall>;
};


export type QueryQueryRankingListArgs = {
  bysci?: Maybe<Scalars['Boolean']>;
  from?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['Int']>;
};


export type QueryQuerySubjectArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QuerySearchByTagArgs = {
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  minVoters?: Maybe<Scalars['Int']>;
  minFavs?: Maybe<Scalars['Int']>;
};


export type QuerySearchRelatedTagsArgs = {
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryQueryBangumiSubjectArgs = {
  id?: Maybe<Scalars['Int']>;
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

export type SubjectSmall = {
  __typename?: 'SubjectSmall';
  id: Scalars['ID'];
  url: Scalars['String'];
  type: Scalars['String'];
  name: Scalars['String'];
  name_cn?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  air_date?: Maybe<Scalars['String']>;
  air_weekday?: Maybe<Scalars['Int']>;
  images?: Maybe<ImageUrls>;
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
    & SubjectWithoutTagFragment
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
    & SubjectWithoutTagFragment
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

export type GetSubjectQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;


export type GetSubjectQuery = (
  { __typename?: 'Query' }
  & { querySubject?: Maybe<(
    { __typename?: 'Subject' }
    & SubjectFragment
  )> }
);

export type GetBangumiSubjectQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;


export type GetBangumiSubjectQuery = (
  { __typename?: 'Query' }
  & { queryBangumiSubject?: Maybe<(
    { __typename?: 'SubjectSmall' }
    & SubjectSmallFragment
  )> }
);

export type SubjectWithoutTagFragment = (
  { __typename?: 'Subject' }
  & Pick<Subject, 'id' | 'date' | 'name' | 'nameCN' | 'rank' | 'sciRank' | 'type'>
);

export type TagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'tag' | 'tagCount' | 'userCount' | 'confidence'>
);

export type SubjectFragment = (
  { __typename?: 'Subject' }
  & Pick<Subject, 'votenum' | 'favnum'>
  & { tags?: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & TagFragment
  )>>> }
  & SubjectWithoutTagFragment
);

export type BriefTagFragment = (
  { __typename?: 'BriefTag' }
  & Pick<BriefTag, 'tag' | 'coverage'>
);

export type ImageUrlsFragment = (
  { __typename?: 'ImageUrls' }
  & Pick<ImageUrls, 'large'>
);

export type SubjectSmallFragment = (
  { __typename?: 'SubjectSmall' }
  & Pick<SubjectSmall, 'id' | 'url' | 'type' | 'name' | 'name_cn' | 'summary' | 'air_date' | 'air_weekday'>
  & { images?: Maybe<(
    { __typename?: 'ImageUrls' }
    & ImageUrlsFragment
  )> }
);

export const SubjectWithoutTagFragmentDoc = gql`
    fragment SubjectWithoutTag on Subject {
  id
  date
  name
  nameCN
  rank
  sciRank
  type
}
    `;
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
  ...SubjectWithoutTag
  votenum
  favnum
  tags {
    ...Tag
  }
}
    ${SubjectWithoutTagFragmentDoc}
${TagFragmentDoc}`;
export const BriefTagFragmentDoc = gql`
    fragment BriefTag on BriefTag {
  tag
  coverage
}
    `;
export const ImageUrlsFragmentDoc = gql`
    fragment ImageUrls on ImageUrls {
  large
}
    `;
export const SubjectSmallFragmentDoc = gql`
    fragment SubjectSmall on SubjectSmall {
  id
  url
  type
  name
  name_cn
  summary
  air_date
  air_weekday
  images {
    ...ImageUrls
  }
}
    ${ImageUrlsFragmentDoc}`;
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
    ...SubjectWithoutTag
  }
}
    ${SubjectWithoutTagFragmentDoc}`;

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
    ...SubjectWithoutTag
  }
}
    ${SubjectWithoutTagFragmentDoc}`;

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
export const GetSubjectDocument = gql`
    query GetSubject($id: Int) {
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
export function useGetSubjectQuery(baseOptions?: Apollo.QueryHookOptions<GetSubjectQuery, GetSubjectQueryVariables>) {
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
    query GetBangumiSubject($id: Int) {
  queryBangumiSubject(id: $id) {
    ...SubjectSmall
  }
}
    ${SubjectSmallFragmentDoc}`;

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
export function useGetBangumiSubjectQuery(baseOptions?: Apollo.QueryHookOptions<GetBangumiSubjectQuery, GetBangumiSubjectQueryVariables>) {
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
export type BriefTagKeySpecifier = ('tag' | 'coverage' | 'confidence' | BriefTagKeySpecifier)[];
export type BriefTagFieldPolicy = {
	tag?: FieldPolicy<any> | FieldReadFunction<any>,
	coverage?: FieldPolicy<any> | FieldReadFunction<any>,
	confidence?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageUrlsKeySpecifier = ('large' | 'common' | 'medium' | 'small' | 'grid' | ImageUrlsKeySpecifier)[];
export type ImageUrlsFieldPolicy = {
	large?: FieldPolicy<any> | FieldReadFunction<any>,
	common?: FieldPolicy<any> | FieldReadFunction<any>,
	medium?: FieldPolicy<any> | FieldReadFunction<any>,
	small?: FieldPolicy<any> | FieldReadFunction<any>,
	grid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('queryRankingDate' | 'queryRankingList' | 'queryRankingCount' | 'querySubject' | 'getTagList' | 'searchByTag' | 'searchRelatedTags' | 'queryBangumiSubject' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	queryRankingDate?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingList?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingCount?: FieldPolicy<any> | FieldReadFunction<any>,
	querySubject?: FieldPolicy<any> | FieldReadFunction<any>,
	getTagList?: FieldPolicy<any> | FieldReadFunction<any>,
	searchByTag?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRelatedTags?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiSubject?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubjectKeySpecifier = ('id' | 'name' | 'nameCN' | 'type' | 'rank' | 'sciRank' | 'date' | 'votenum' | 'favnum' | 'tags' | SubjectKeySpecifier)[];
export type SubjectFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nameCN?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>,
	sciRank?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	votenum?: FieldPolicy<any> | FieldReadFunction<any>,
	favnum?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubjectSmallKeySpecifier = ('id' | 'url' | 'type' | 'name' | 'name_cn' | 'summary' | 'air_date' | 'air_weekday' | 'images' | SubjectSmallKeySpecifier)[];
export type SubjectSmallFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	name_cn?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	air_date?: FieldPolicy<any> | FieldReadFunction<any>,
	air_weekday?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TagKeySpecifier = ('tag' | 'tagCount' | 'userCount' | 'confidence' | TagKeySpecifier)[];
export type TagFieldPolicy = {
	tag?: FieldPolicy<any> | FieldReadFunction<any>,
	tagCount?: FieldPolicy<any> | FieldReadFunction<any>,
	userCount?: FieldPolicy<any> | FieldReadFunction<any>,
	confidence?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BriefTag?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BriefTagKeySpecifier | (() => undefined | BriefTagKeySpecifier),
		fields?: BriefTagFieldPolicy,
	},
	ImageUrls?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageUrlsKeySpecifier | (() => undefined | ImageUrlsKeySpecifier),
		fields?: ImageUrlsFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubjectKeySpecifier | (() => undefined | SubjectKeySpecifier),
		fields?: SubjectFieldPolicy,
	},
	SubjectSmall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubjectSmallKeySpecifier | (() => undefined | SubjectSmallKeySpecifier),
		fields?: SubjectSmallFieldPolicy,
	},
	Tag?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TagKeySpecifier | (() => undefined | TagKeySpecifier),
		fields?: TagFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;