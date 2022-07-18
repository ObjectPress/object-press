import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const apolloCache = new InMemoryCache({
  addTypename: true,
  resultCaching: true,
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
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

export const query = async (name, query, variables) => {
  const response = await client.query({
    query,
    variables,
    fetchPolicy: 'no-cache',
  });

  return response.data[name];
};

export const mutate = async (name, mutation, variables) => {
  const response = await client.mutate({
    mutation,
    variables,
  });

  return response.data[name];
};
