import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BangumiSubject = {
  __typename?: 'BangumiSubject';
  collection?: Maybe<Collection>;
  date?: Maybe<Scalars['String']>;
  eps: Scalars['Int'];
  id: Scalars['ID'];
  images?: Maybe<Images>;
  infobox?: Maybe<Array<Maybe<Item>>>;
  locled: Scalars['Boolean'];
  name: Scalars['String'];
  name_cn: Scalars['String'];
  nsfw: Scalars['Boolean'];
  platform?: Maybe<Scalars['String']>;
  rating?: Maybe<Rating>;
  summary: Scalars['String'];
  total_episodes: Scalars['Int'];
  type: Scalars['String'];
  volumes: Scalars['Int'];
};

export type Collection = {
  __typename?: 'Collection';
  collect: Scalars['Int'];
  doing: Scalars['Int'];
  dropped: Scalars['Int'];
  on_hold: Scalars['Int'];
  wish: Scalars['Int'];
};

export type CustomRank = {
  __typename?: 'CustomRank';
  sciRank: Scalars['Int'];
};

export type Images = {
  __typename?: 'Images';
  common: Scalars['String'];
  grid: Scalars['String'];
  large: Scalars['String'];
  medium: Scalars['String'];
  small: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  queryAutoComplete?: Maybe<Array<Scalars['String']>>;
  queryBangumiSubject?: Maybe<BangumiSubject>;
  queryRankingDate: Scalars['String'];
  queryRankingList: Array<Subject>;
  queryRelatedSubjects?: Maybe<Array<Subject>>;
  queryRelatedTags?: Maybe<Array<Tag>>;
  querySubject?: Maybe<Subject>;
};


export type QueryQueryAutoCompleteArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryQueryBangumiSubjectArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryQueryRankingListArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type QueryQueryRelatedSubjectsArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryQueryRelatedTagsArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryQuerySubjectArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Rating = {
  __typename?: 'Rating';
  count: Scalars['String'];
  rank: Scalars['Int'];
  score: Scalars['Float'];
  total: Scalars['Int'];
};

export type Subject = {
  __typename?: 'Subject';
  collectCount: Scalars['Int'];
  doCount: Scalars['Int'];
  droppedCount: Scalars['Int'];
  favCount: Scalars['Int'];
  id: Scalars['ID'];
  infobox: Scalars['String'];
  name: Scalars['String'];
  nameCN?: Maybe<Scalars['String']>;
  nsfw: Scalars['Boolean'];
  onHoldCount: Scalars['Int'];
  platform: Scalars['Int'];
  rank?: Maybe<Scalars['Int']>;
  rateCount: Scalars['Int'];
  scientificRank?: Maybe<CustomRank>;
  score?: Maybe<Scalars['Float']>;
  summary?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Tag>>;
  type: Scalars['String'];
  wishCount: Scalars['Int'];
};

export type Tag = {
  __typename?: 'Tag';
  confidence: Scalars['Float'];
  content: Scalars['String'];
  userCount: Scalars['Int'];
};

export type GetRankingDateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRankingDateQuery = { __typename?: 'Query', queryRankingDate: string };

export type GetRankingListQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
}>;


export type GetRankingListQuery = { __typename?: 'Query', queryRankingList: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null | undefined, infobox: string, platform: number, summary?: string | null | undefined, rank?: number | null | undefined, nsfw: boolean, type: string, favCount: number, rateCount: number, collectCount: number, doCount: number, droppedCount: number, onHoldCount: number, wishCount: number, score?: number | null | undefined, scientificRank?: { __typename?: 'CustomRank', sciRank: number } | null | undefined, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null | undefined }> };

export type GetAutoCompleteQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type GetAutoCompleteQuery = { __typename?: 'Query', queryAutoComplete?: Array<string> | null | undefined };

export type GetRelatedSubjectsQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type GetRelatedSubjectsQuery = { __typename?: 'Query', queryRelatedSubjects?: Array<{ __typename?: 'Subject', id: string, name: string, nameCN?: string | null | undefined, infobox: string, platform: number, summary?: string | null | undefined, rank?: number | null | undefined, nsfw: boolean, type: string, favCount: number, rateCount: number, collectCount: number, doCount: number, droppedCount: number, onHoldCount: number, wishCount: number, score?: number | null | undefined, scientificRank?: { __typename?: 'CustomRank', sciRank: number } | null | undefined, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null | undefined }> | null | undefined };

export type GetRelatedTagsQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']>;
}>;


export type GetRelatedTagsQuery = { __typename?: 'Query', queryRelatedTags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null | undefined };

export type GetSubjectQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type GetSubjectQuery = { __typename?: 'Query', querySubject?: { __typename?: 'Subject', id: string, name: string, nameCN?: string | null | undefined, infobox: string, platform: number, summary?: string | null | undefined, rank?: number | null | undefined, nsfw: boolean, type: string, favCount: number, rateCount: number, collectCount: number, doCount: number, droppedCount: number, onHoldCount: number, wishCount: number, score?: number | null | undefined, scientificRank?: { __typename?: 'CustomRank', sciRank: number } | null | undefined, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null | undefined } | null | undefined };

export type GetBangumiSubjectQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type GetBangumiSubjectQuery = { __typename?: 'Query', queryBangumiSubject?: { __typename?: 'BangumiSubject', id: string, type: string, name: string, name_cn: string, summary: string, nsfw: boolean, locled: boolean, date?: string | null | undefined, platform?: string | null | undefined, volumes: number, eps: number, total_episodes: number, images?: { __typename?: 'Images', large: string, common: string, medium: string, small: string, grid: string } | null | undefined, infobox?: Array<{ __typename?: 'Item', key: string, value: string } | null | undefined> | null | undefined, rating?: { __typename?: 'Rating', rank: number, total: number, count: string, score: number } | null | undefined, collection?: { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number } | null | undefined } | null | undefined };

export type TagFragment = { __typename?: 'Tag', content: string, userCount: number, confidence: number };

export type CustomRankFragment = { __typename?: 'CustomRank', sciRank: number };

export type SubjectFragment = { __typename?: 'Subject', id: string, name: string, nameCN?: string | null | undefined, infobox: string, platform: number, summary?: string | null | undefined, rank?: number | null | undefined, nsfw: boolean, type: string, favCount: number, rateCount: number, collectCount: number, doCount: number, droppedCount: number, onHoldCount: number, wishCount: number, score?: number | null | undefined, scientificRank?: { __typename?: 'CustomRank', sciRank: number } | null | undefined, tags?: Array<{ __typename?: 'Tag', content: string, userCount: number, confidence: number }> | null | undefined };

export type ImagesFragment = { __typename?: 'Images', large: string, common: string, medium: string, small: string, grid: string };

export type ItemFragment = { __typename?: 'Item', key: string, value: string };

export type RatingFragment = { __typename?: 'Rating', rank: number, total: number, count: string, score: number };

export type CollectionFragment = { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number };

export type BangumiSubjectFragment = { __typename?: 'BangumiSubject', id: string, type: string, name: string, name_cn: string, summary: string, nsfw: boolean, locled: boolean, date?: string | null | undefined, platform?: string | null | undefined, volumes: number, eps: number, total_episodes: number, images?: { __typename?: 'Images', large: string, common: string, medium: string, small: string, grid: string } | null | undefined, infobox?: Array<{ __typename?: 'Item', key: string, value: string } | null | undefined> | null | undefined, rating?: { __typename?: 'Rating', rank: number, total: number, count: string, score: number } | null | undefined, collection?: { __typename?: 'Collection', wish: number, collect: number, doing: number, on_hold: number, dropped: number } | null | undefined };

export const CustomRankFragmentDoc = gql`
    fragment CustomRank on CustomRank {
  sciRank
}
    `;
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
  infobox
  platform
  summary
  rank
  nsfw
  type
  favCount
  rateCount
  collectCount
  doCount
  droppedCount
  onHoldCount
  wishCount
  score
  scientificRank {
    ...CustomRank
  }
  tags {
    ...Tag
  }
}
    ${CustomRankFragmentDoc}
${TagFragmentDoc}`;
export const ImagesFragmentDoc = gql`
    fragment Images on Images {
  large
  common
  medium
  small
  grid
}
    `;
export const ItemFragmentDoc = gql`
    fragment Item on Item {
  key
  value
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
export const BangumiSubjectFragmentDoc = gql`
    fragment BangumiSubject on BangumiSubject {
  id
  type
  name
  name_cn
  summary
  nsfw
  locled
  date
  platform
  images {
    ...Images
  }
  infobox {
    ...Item
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
}
    ${ImagesFragmentDoc}
${ItemFragmentDoc}
${RatingFragmentDoc}
${CollectionFragmentDoc}`;
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
    query GetRankingList($type: String) {
  queryRankingList(type: $type) {
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
 *      type: // value for 'type'
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
export const GetAutoCompleteDocument = gql`
    query GetAutoComplete($q: String) {
  queryAutoComplete(q: $q)
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
 *   },
 * });
 */
export function useGetAutoCompleteQuery(baseOptions?: Apollo.QueryHookOptions<GetAutoCompleteQuery, GetAutoCompleteQueryVariables>) {
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
    query GetRelatedSubjects($q: String) {
  queryRelatedSubjects(q: $q) {
    ...Subject
  }
}
    ${SubjectFragmentDoc}`;

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
export function useGetRelatedSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetRelatedSubjectsQuery, GetRelatedSubjectsQueryVariables>) {
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
export const GetRelatedTagsDocument = gql`
    query GetRelatedTags($q: String) {
  queryRelatedTags(q: $q) {
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
 *      q: // value for 'q'
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
export type BangumiSubjectKeySpecifier = ('collection' | 'date' | 'eps' | 'id' | 'images' | 'infobox' | 'locled' | 'name' | 'name_cn' | 'nsfw' | 'platform' | 'rating' | 'summary' | 'total_episodes' | 'type' | 'volumes' | BangumiSubjectKeySpecifier)[];
export type BangumiSubjectFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	eps?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	infobox?: FieldPolicy<any> | FieldReadFunction<any>,
	locled?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type CustomRankKeySpecifier = ('sciRank' | CustomRankKeySpecifier)[];
export type CustomRankFieldPolicy = {
	sciRank?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImagesKeySpecifier = ('common' | 'grid' | 'large' | 'medium' | 'small' | ImagesKeySpecifier)[];
export type ImagesFieldPolicy = {
	common?: FieldPolicy<any> | FieldReadFunction<any>,
	grid?: FieldPolicy<any> | FieldReadFunction<any>,
	large?: FieldPolicy<any> | FieldReadFunction<any>,
	medium?: FieldPolicy<any> | FieldReadFunction<any>,
	small?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemKeySpecifier = ('key' | 'value' | ItemKeySpecifier)[];
export type ItemFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('queryAutoComplete' | 'queryBangumiSubject' | 'queryRankingDate' | 'queryRankingList' | 'queryRelatedSubjects' | 'queryRelatedTags' | 'querySubject' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	queryAutoComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	queryBangumiSubject?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingDate?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRankingList?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRelatedSubjects?: FieldPolicy<any> | FieldReadFunction<any>,
	queryRelatedTags?: FieldPolicy<any> | FieldReadFunction<any>,
	querySubject?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RatingKeySpecifier = ('count' | 'rank' | 'score' | 'total' | RatingKeySpecifier)[];
export type RatingFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubjectKeySpecifier = ('collectCount' | 'doCount' | 'droppedCount' | 'favCount' | 'id' | 'infobox' | 'name' | 'nameCN' | 'nsfw' | 'onHoldCount' | 'platform' | 'rank' | 'rateCount' | 'scientificRank' | 'score' | 'summary' | 'tags' | 'type' | 'wishCount' | SubjectKeySpecifier)[];
export type SubjectFieldPolicy = {
	collectCount?: FieldPolicy<any> | FieldReadFunction<any>,
	doCount?: FieldPolicy<any> | FieldReadFunction<any>,
	droppedCount?: FieldPolicy<any> | FieldReadFunction<any>,
	favCount?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	infobox?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nameCN?: FieldPolicy<any> | FieldReadFunction<any>,
	nsfw?: FieldPolicy<any> | FieldReadFunction<any>,
	onHoldCount?: FieldPolicy<any> | FieldReadFunction<any>,
	platform?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>,
	rateCount?: FieldPolicy<any> | FieldReadFunction<any>,
	scientificRank?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	wishCount?: FieldPolicy<any> | FieldReadFunction<any>
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
	CustomRank?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomRankKeySpecifier | (() => undefined | CustomRankKeySpecifier),
		fields?: CustomRankFieldPolicy,
	},
	Images?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImagesKeySpecifier | (() => undefined | ImagesKeySpecifier),
		fields?: ImagesFieldPolicy,
	},
	Item?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemKeySpecifier | (() => undefined | ItemKeySpecifier),
		fields?: ItemFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Rating?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RatingKeySpecifier | (() => undefined | RatingKeySpecifier),
		fields?: RatingFieldPolicy,
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