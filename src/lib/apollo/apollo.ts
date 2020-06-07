import { useMemo } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.FAUNADB_URL,
      credentials: "same-origin",
      headers: {
        authorization: `Bearer ${process.env.FAUNADB_CENSURANAO_SECRET_KEY}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState as NormalizedCacheObject);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
