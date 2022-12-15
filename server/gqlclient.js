const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const { setContext } = require('apollo-link-context');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');

const gqlEndpoint = process.env.TRAY_ENDPOINT;
const masterToken = process.env.TRAY_MASTER_TOKEN;

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

// Create a Apollo Client Context for a given auth token:
const authLink = (token) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));

// Generate an Apollo Client for a given auth token:
const generateClient = (token) =>
  new ApolloClient({
    link: authLink(token).concat(new HttpLink({ uri: gqlEndpoint, fetch })),
    cache: new InMemoryCache(),
    defaultOptions,
  });

module.exports = {
  generateClient,
  masterClient: generateClient(masterToken),
};
