import gql from 'graphql-tag';

export const stateQuery = gql`
  query {
    state @client {
      nodes
    }
  }
`;

export const nextQuery = gql`
  query {
    next @client
  }
`;

export const resetQuery = gql`
  query {
    reset @client
  }
`;

