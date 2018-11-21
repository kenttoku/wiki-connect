import gql from 'graphql-tag';

export const createArticle = gql`
  mutation($search: String!) {
    createArticle(search: $search) {
      title
      next
    }
  }
`;