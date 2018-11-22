import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { API_BASE_URL } from './config';

// Components
import App from './components/App';

// Styling
import './index.css';

const defaults = {
  state: {
    __typename: 'State',
    nodes: [
      { title: 'Philosophy', next: 'Problem solving', __typename: 'Article' },
      { title: 'Problem solving', next: 'Artificial intelligence', __typename: 'Article' },
      { title: 'Artificial intelligence', next: 'Intelligence', __typename: 'Article' },
      { title: 'Intelligence', next: 'Logic', __typename: 'Article' },
      { title: 'Logic', next: 'Truth', __typename: 'Article' },
      { title: 'Truth', next: 'Fact', __typename: 'Article' },
      { title: 'Fact', next: 'Reality', __typename: 'Article' },
      { title: 'Reality', next: 'Existence', __typename: 'Article' },
      { title: 'Existence', next: 'Reality', __typename: 'Article' }
    ]
  },
  next: null,
  reset: true
};

const httpLink = createHttpLink({
  uri: API_BASE_URL
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults,
  resolvers: {
    Mutation: {
      resetState: (_parent, _args, { cache }) => {
        const query= gql`
          query getState {
            state @client {
              nodes
            }
          }
        `;

        const data = {
          state: {
            __typename: 'State',
            nodes: []
          },
        };

        cache.writeQuery({ query, data });
        return data.state;
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));