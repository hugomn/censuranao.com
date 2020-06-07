import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from 'lib/apollo'
import './app.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
    </ApolloProvider>
  )
}
