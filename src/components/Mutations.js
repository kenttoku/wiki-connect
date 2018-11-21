import gql from 'graphql-tag';

export const createArticle = gql`
  mutation($search: String!) {
    createArticle(search: $search) {
      title
      next
    }
  }
`;

export const updateState = gql`
  mutation updateState($value: String!) {
    updateState(value: $value) @client {
      nodes
      links
    }
  }
`;