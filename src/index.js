import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

// Components
import App from './components/App';

// Styling
import './index.css';

const defaults = {
  state: {
    __typename: 'State',
    nodes: [],
    links: []
  }
};

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const cache = new InMemoryCache();

const stateLink = withClientState({ cache, defaults, resolvers: {
  Mutation: {
    updateNodes: (_, { value }, { cache }) => {
      console.log(value);
    }
  }
} });

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));