import '../styles/globals.css';
import NavbarBottom from '../components/navigation/NavbarBottom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

function MyApp({ Component, pageProps }) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
  });

  const link = from([
    errorLink,
    new HttpLink({
      uri:
        'http://localhost:3000/api/graphql' ||
        'https://zabka-app.vercel.app/api/graphql',
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
  return (
    <div>
      <ApolloProvider client={client}>
        <NavbarBottom></NavbarBottom>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
