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
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};


/** 'Entry' input values */
export type EntryInput = {
  regiao: Scalars['String'];
  estado?: Maybe<Scalars['String']>;
  municipio?: Maybe<Scalars['String']>;
  coduf?: Maybe<Scalars['Int']>;
  codmun?: Maybe<Scalars['Int']>;
  codRegiaoSaude?: Maybe<Scalars['Int']>;
  nomeRegiaoSaude?: Maybe<Scalars['String']>;
  data: Scalars['String'];
  semanaEpi?: Maybe<Scalars['Int']>;
  populacaoTCU2019?: Maybe<Scalars['String']>;
  casosAcumulado?: Maybe<Scalars['Int']>;
  casosNovos?: Maybe<Scalars['Int']>;
  obitosAcumulado?: Maybe<Scalars['Int']>;
  obitosNovos?: Maybe<Scalars['Int']>;
  recuperadosnovos?: Maybe<Scalars['Int']>;
  emAcompanhamentoNovos?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  /** Create a new document in the collection of 'Entry' */
  createEntry: Entry;
  /** Update an existing document in the collection of 'Entry' */
  updateEntry?: Maybe<Entry>;
  /** Delete an existing document in the collection of 'Entry' */
  deleteEntry?: Maybe<Entry>;
};


export type MutationCreateEntryArgs = {
  data: EntryInput;
};


export type MutationUpdateEntryArgs = {
  id: Scalars['ID'];
  data: EntryInput;
};


export type MutationDeleteEntryArgs = {
  id: Scalars['ID'];
};


export type Entry = {
  estado?: Maybe<Scalars['String']>;
  municipio?: Maybe<Scalars['String']>;
  casosNovos?: Maybe<Scalars['Int']>;
  regiao: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  obitosAcumulado?: Maybe<Scalars['Int']>;
  emAcompanhamentoNovos?: Maybe<Scalars['Int']>;
  codRegiaoSaude?: Maybe<Scalars['Int']>;
  data: Scalars['String'];
  coduf?: Maybe<Scalars['Int']>;
  nomeRegiaoSaude?: Maybe<Scalars['String']>;
  codmun?: Maybe<Scalars['Int']>;
  semanaEpi?: Maybe<Scalars['Int']>;
  casosAcumulado?: Maybe<Scalars['Int']>;
  recuperadosnovos?: Maybe<Scalars['Int']>;
  populacaoTCU2019?: Maybe<Scalars['String']>;
  obitosNovos?: Maybe<Scalars['Int']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Entry'. */
export type EntryPage = {
  /** The elements of type 'Entry' in this page. */
  data: Array<Maybe<Entry>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  /** Find a document from the collection of 'Entry' by its id. */
  findEntryByID?: Maybe<Entry>;
  findAllEntriesByRegiao: EntryPage;
};


export type QueryFindEntryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindAllEntriesByRegiaoArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  regiao?: Maybe<Scalars['String']>;
};


export type FindAllEntriesByRegiaoQueryVariables = {
  regiao?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type FindAllEntriesByRegiaoQuery = { findAllEntriesByRegiao: (
    Pick<EntryPage, 'after' | 'before'>
    & { data: Array<Maybe<Pick<Entry, 'regiao' | 'estado' | 'municipio' | 'coduf' | 'codmun' | 'codRegiaoSaude' | 'nomeRegiaoSaude' | 'data' | 'semanaEpi' | 'populacaoTCU2019' | 'casosAcumulado' | 'casosNovos' | 'obitosAcumulado' | 'obitosNovos' | 'recuperadosnovos' | 'emAcompanhamentoNovos'>>> }
  ) };


export const FindAllEntriesByRegiaoDocument = gql`
    query findAllEntriesByRegiao($regiao: String, $size: Int, $cursor: String) {
  findAllEntriesByRegiao(regiao: $regiao, _size: $size, _cursor: $cursor) {
    data {
      regiao
      estado
      municipio
      coduf
      codmun
      codRegiaoSaude
      nomeRegiaoSaude
      data
      semanaEpi
      populacaoTCU2019
      casosAcumulado
      casosNovos
      obitosAcumulado
      obitosNovos
      recuperadosnovos
      emAcompanhamentoNovos
    }
    after
    before
  }
}
    `;
export type FindAllEntriesByRegiaoComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>, 'query'>;

    export const FindAllEntriesByRegiaoComponent = (props: FindAllEntriesByRegiaoComponentProps) => (
      <ApolloReactComponents.Query<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables> query={FindAllEntriesByRegiaoDocument} {...props} />
    );
    
export type FindAllEntriesByRegiaoProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>
    } & TChildProps;
export function withFindAllEntriesByRegiao<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FindAllEntriesByRegiaoQuery,
  FindAllEntriesByRegiaoQueryVariables,
  FindAllEntriesByRegiaoProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables, FindAllEntriesByRegiaoProps<TChildProps, TDataName>>(FindAllEntriesByRegiaoDocument, {
      alias: 'findAllEntriesByRegiao',
      ...operationOptions
    });
};

/**
 * __useFindAllEntriesByRegiaoQuery__
 *
 * To run a query within a React component, call `useFindAllEntriesByRegiaoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllEntriesByRegiaoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllEntriesByRegiaoQuery({
 *   variables: {
 *      regiao: // value for 'regiao'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFindAllEntriesByRegiaoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>(FindAllEntriesByRegiaoDocument, baseOptions);
      }
export function useFindAllEntriesByRegiaoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>(FindAllEntriesByRegiaoDocument, baseOptions);
        }
export type FindAllEntriesByRegiaoQueryHookResult = ReturnType<typeof useFindAllEntriesByRegiaoQuery>;
export type FindAllEntriesByRegiaoLazyQueryHookResult = ReturnType<typeof useFindAllEntriesByRegiaoLazyQuery>;
export type FindAllEntriesByRegiaoQueryResult = ApolloReactCommon.QueryResult<FindAllEntriesByRegiaoQuery, FindAllEntriesByRegiaoQueryVariables>;
export function refetchFindAllEntriesByRegiaoQuery(variables?: FindAllEntriesByRegiaoQueryVariables) {
      return { query: FindAllEntriesByRegiaoDocument, variables: variables }
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
    