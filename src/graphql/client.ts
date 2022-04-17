import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  DocumentNode,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type Query = <QV, RT>(
  name: string,
  query: DocumentNode,
  variables?: QV
) => Promise<RT>;
type Mutate = <MV, RT>(
  name: string,
  mutation: DocumentNode,
  variables?: MV
) => Promise<RT>;

const apolloCache = new InMemoryCache({
  // addTypename: false,
  // resultCaching: false,
});

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage?.getItem('op-access-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'keep-alive': 'true',
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: apolloCache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export const query: Query = async (name, query, variables) => {
  const response = await client.query({
    query,
    variables,
    fetchPolicy: 'no-cache',
  });

  return response.data[name];
};

export const mutate: Mutate = async (name, mutation, variables) => {
  const response = await client.mutate({
    mutation,
    variables,
  });

  return response.data[name];
};
