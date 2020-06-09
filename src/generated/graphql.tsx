import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Date: any;
  Time: any;
};

export type DailyEntry = {
  totalRecovered?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  newCases?: Maybe<Scalars['Int']>;
  source: Source;
  state?: Maybe<Scalars['String']>;
  newRecovered?: Maybe<Scalars['Int']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  country?: Maybe<Scalars['String']>;
  newDeaths?: Maybe<Scalars['Int']>;
  date: Scalars['String'];
  entryType: EntryType;
  totalCases?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  epiWeek?: Maybe<Scalars['Int']>;
  totalDeaths?: Maybe<Scalars['Int']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'DailyEntry' input values */
export type DailyEntryInput = {
  entryType: EntryType;
  name: Scalars['String'];
  date: Scalars['String'];
  source: Source;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  epiWeek?: Maybe<Scalars['Int']>;
  newCases?: Maybe<Scalars['Int']>;
  totalCases?: Maybe<Scalars['Int']>;
  newDeaths?: Maybe<Scalars['Int']>;
  totalDeaths?: Maybe<Scalars['Int']>;
  newRecovered?: Maybe<Scalars['Int']>;
  totalRecovered?: Maybe<Scalars['Int']>;
};

/** The pagination object for elements of type 'DailyEntry'. */
export type DailyEntryPage = {
  /** The elements of type 'DailyEntry' in this page. */
  data: Array<Maybe<DailyEntry>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};


export enum EntryType {
  Country = 'COUNTRY',
  Region = 'REGION',
  State = 'STATE',
  City = 'CITY'
}


export type Mutation = {
  /** Create a new document in the collection of 'DailyEntry' */
  createDailyEntry: DailyEntry;
  /** Update an existing document in the collection of 'DailyEntry' */
  updateDailyEntry?: Maybe<DailyEntry>;
  /** Delete an existing document in the collection of 'DailyEntry' */
  deleteDailyEntry?: Maybe<DailyEntry>;
};


export type MutationCreateDailyEntryArgs = {
  data: DailyEntryInput;
};


export type MutationUpdateDailyEntryArgs = {
  id: Scalars['ID'];
  data: DailyEntryInput;
};


export type MutationDeleteDailyEntryArgs = {
  id: Scalars['ID'];
};

export type Query = {
  /** Find a document from the collection of 'DailyEntry' by its id. */
  findDailyEntryByID?: Maybe<DailyEntry>;
  findAllDailyEntries: DailyEntryPage;
  findAllDailyEntriesBySource: DailyEntryPage;
};


export type QueryFindDailyEntryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindAllDailyEntriesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  entryType?: Maybe<EntryType>;
  name?: Maybe<Scalars['String']>;
};


export type QueryFindAllDailyEntriesBySourceArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  entryType?: Maybe<EntryType>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Source>;
};

export enum Source {
  HealthMinister = 'HEALTH_MINISTER',
  Brasilio = 'BRASILIO'
}


export type FindAllDailyEntriesQueryVariables = {
  entryType?: Maybe<EntryType>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type FindAllDailyEntriesQuery = { findAllDailyEntries: (
    Pick<DailyEntryPage, 'after' | 'before'>
    & { data: Array<Maybe<Pick<DailyEntry, 'entryType' | 'name' | 'date' | 'source' | 'country' | 'region' | 'state' | 'city' | 'epiWeek' | 'newCases' | 'totalCases' | 'newDeaths' | 'totalDeaths' | 'newRecovered' | 'totalRecovered'>>> }
  ) };

export type FindAllDailyEntriesBySourceQueryVariables = {
  entryType?: Maybe<EntryType>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Source>;
  size?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type FindAllDailyEntriesBySourceQuery = { findAllDailyEntriesBySource: (
    Pick<DailyEntryPage, 'after' | 'before'>
    & { data: Array<Maybe<Pick<DailyEntry, 'entryType' | 'name' | 'date' | 'source' | 'country' | 'region' | 'state' | 'city' | 'epiWeek' | 'newCases' | 'totalCases' | 'newDeaths' | 'totalDeaths' | 'newRecovered' | 'totalRecovered'>>> }
  ) };


export const FindAllDailyEntriesDocument = gql`
    query findAllDailyEntries($entryType: EntryType, $name: String, $size: Int, $cursor: String) {
  findAllDailyEntries(entryType: $entryType, name: $name, _size: $size, _cursor: $cursor) {
    data {
      entryType
      name
      date
      source
      country
      region
      state
      city
      epiWeek
      newCases
      totalCases
      newDeaths
      totalDeaths
      newRecovered
      totalRecovered
    }
    after
    before
  }
}
    `;
export type FindAllDailyEntriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>, 'query'>;

    export const FindAllDailyEntriesComponent = (props: FindAllDailyEntriesComponentProps) => (
      <ApolloReactComponents.Query<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables> query={FindAllDailyEntriesDocument} {...props} />
    );
    
export type FindAllDailyEntriesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>
    } & TChildProps;
export function withFindAllDailyEntries<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindAllDailyEntriesQuery,
  FindAllDailyEntriesQueryVariables,
  FindAllDailyEntriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables, FindAllDailyEntriesProps<TChildProps, TDataName>>(FindAllDailyEntriesDocument, {
      alias: 'findAllDailyEntries',
      ...operationOptions
    });
};

/**
 * __useFindAllDailyEntriesQuery__
 *
 * To run a query within a React component, call `useFindAllDailyEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllDailyEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllDailyEntriesQuery({
 *   variables: {
 *      entryType: // value for 'entryType'
 *      name: // value for 'name'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFindAllDailyEntriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>(FindAllDailyEntriesDocument, baseOptions);
      }
export function useFindAllDailyEntriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>(FindAllDailyEntriesDocument, baseOptions);
        }
export type FindAllDailyEntriesQueryHookResult = ReturnType<typeof useFindAllDailyEntriesQuery>;
export type FindAllDailyEntriesLazyQueryHookResult = ReturnType<typeof useFindAllDailyEntriesLazyQuery>;
export type FindAllDailyEntriesQueryResult = ApolloReactCommon.QueryResult<FindAllDailyEntriesQuery, FindAllDailyEntriesQueryVariables>;
export function refetchFindAllDailyEntriesQuery(variables?: FindAllDailyEntriesQueryVariables) {
      return { query: FindAllDailyEntriesDocument, variables: variables }
    }
export const FindAllDailyEntriesBySourceDocument = gql`
    query findAllDailyEntriesBySource($entryType: EntryType, $name: String, $source: Source, $size: Int, $cursor: String) {
  findAllDailyEntriesBySource(entryType: $entryType, name: $name, source: $source, _size: $size, _cursor: $cursor) {
    data {
      entryType
      name
      date
      source
      country
      region
      state
      city
      epiWeek
      newCases
      totalCases
      newDeaths
      totalDeaths
      newRecovered
      totalRecovered
    }
    after
    before
  }
}
    `;
export type FindAllDailyEntriesBySourceComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>, 'query'>;

    export const FindAllDailyEntriesBySourceComponent = (props: FindAllDailyEntriesBySourceComponentProps) => (
      <ApolloReactComponents.Query<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables> query={FindAllDailyEntriesBySourceDocument} {...props} />
    );
    
export type FindAllDailyEntriesBySourceProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>
    } & TChildProps;
export function withFindAllDailyEntriesBySource<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindAllDailyEntriesBySourceQuery,
  FindAllDailyEntriesBySourceQueryVariables,
  FindAllDailyEntriesBySourceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables, FindAllDailyEntriesBySourceProps<TChildProps, TDataName>>(FindAllDailyEntriesBySourceDocument, {
      alias: 'findAllDailyEntriesBySource',
      ...operationOptions
    });
};

/**
 * __useFindAllDailyEntriesBySourceQuery__
 *
 * To run a query within a React component, call `useFindAllDailyEntriesBySourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllDailyEntriesBySourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllDailyEntriesBySourceQuery({
 *   variables: {
 *      entryType: // value for 'entryType'
 *      name: // value for 'name'
 *      source: // value for 'source'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFindAllDailyEntriesBySourceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>(FindAllDailyEntriesBySourceDocument, baseOptions);
      }
export function useFindAllDailyEntriesBySourceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>(FindAllDailyEntriesBySourceDocument, baseOptions);
        }
export type FindAllDailyEntriesBySourceQueryHookResult = ReturnType<typeof useFindAllDailyEntriesBySourceQuery>;
export type FindAllDailyEntriesBySourceLazyQueryHookResult = ReturnType<typeof useFindAllDailyEntriesBySourceLazyQuery>;
export type FindAllDailyEntriesBySourceQueryResult = ApolloReactCommon.QueryResult<FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceQueryVariables>;
export function refetchFindAllDailyEntriesBySourceQuery(variables?: FindAllDailyEntriesBySourceQueryVariables) {
      return { query: FindAllDailyEntriesBySourceDocument, variables: variables }
    }

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    