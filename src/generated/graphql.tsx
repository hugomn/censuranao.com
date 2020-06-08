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
  findAllDailyEntriesByEntryTypeAndName: DailyEntryPage;
};


export type QueryFindDailyEntryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindAllDailyEntriesByEntryTypeAndNameArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  entryType?: Maybe<EntryType>;
  name?: Maybe<Scalars['String']>;
};

export enum Source {
  HealthMinister = 'HEALTH_MINISTER',
  Brasilio = 'BRASILIO'
}


export type FindAllDailyEntriesByEntryTypeAndNameQueryVariables = {
  entryType?: Maybe<EntryType>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type FindAllDailyEntriesByEntryTypeAndNameQuery = { findAllDailyEntriesByEntryTypeAndName: (
    Pick<DailyEntryPage, 'after' | 'before'>
    & { data: Array<Maybe<Pick<DailyEntry, 'entryType' | 'name' | 'date' | 'source' | 'country' | 'region' | 'state' | 'city' | 'epiWeek' | 'newCases' | 'totalCases' | 'newDeaths' | 'totalDeaths' | 'newRecovered' | 'totalRecovered'>>> }
  ) };


export const FindAllDailyEntriesByEntryTypeAndNameDocument = gql`
    query findAllDailyEntriesByEntryTypeAndName($entryType: EntryType, $name: String, $size: Int, $cursor: String) {
  findAllDailyEntriesByEntryTypeAndName(entryType: $entryType, name: $name, _size: $size, _cursor: $cursor) {
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
export type FindAllDailyEntriesByEntryTypeAndNameComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>, 'query'>;

    export const FindAllDailyEntriesByEntryTypeAndNameComponent = (props: FindAllDailyEntriesByEntryTypeAndNameComponentProps) => (
      <ApolloReactComponents.Query<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables> query={FindAllDailyEntriesByEntryTypeAndNameDocument} {...props} />
    );
    
export type FindAllDailyEntriesByEntryTypeAndNameProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>
    } & TChildProps;
export function withFindAllDailyEntriesByEntryTypeAndName<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindAllDailyEntriesByEntryTypeAndNameQuery,
  FindAllDailyEntriesByEntryTypeAndNameQueryVariables,
  FindAllDailyEntriesByEntryTypeAndNameProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables, FindAllDailyEntriesByEntryTypeAndNameProps<TChildProps, TDataName>>(FindAllDailyEntriesByEntryTypeAndNameDocument, {
      alias: 'findAllDailyEntriesByEntryTypeAndName',
      ...operationOptions
    });
};

/**
 * __useFindAllDailyEntriesByEntryTypeAndNameQuery__
 *
 * To run a query within a React component, call `useFindAllDailyEntriesByEntryTypeAndNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllDailyEntriesByEntryTypeAndNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllDailyEntriesByEntryTypeAndNameQuery({
 *   variables: {
 *      entryType: // value for 'entryType'
 *      name: // value for 'name'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFindAllDailyEntriesByEntryTypeAndNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>(FindAllDailyEntriesByEntryTypeAndNameDocument, baseOptions);
      }
export function useFindAllDailyEntriesByEntryTypeAndNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>(FindAllDailyEntriesByEntryTypeAndNameDocument, baseOptions);
        }
export type FindAllDailyEntriesByEntryTypeAndNameQueryHookResult = ReturnType<typeof useFindAllDailyEntriesByEntryTypeAndNameQuery>;
export type FindAllDailyEntriesByEntryTypeAndNameLazyQueryHookResult = ReturnType<typeof useFindAllDailyEntriesByEntryTypeAndNameLazyQuery>;
export type FindAllDailyEntriesByEntryTypeAndNameQueryResult = ApolloReactCommon.QueryResult<FindAllDailyEntriesByEntryTypeAndNameQuery, FindAllDailyEntriesByEntryTypeAndNameQueryVariables>;
export function refetchFindAllDailyEntriesByEntryTypeAndNameQuery(variables?: FindAllDailyEntriesByEntryTypeAndNameQueryVariables) {
      return { query: FindAllDailyEntriesByEntryTypeAndNameDocument, variables: variables }
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
    