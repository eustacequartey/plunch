import gql from "graphql-tag";

export default gql`
  mutation($id: ID!) {
    toggleUserActivation(id: $id) {
      activated
    }
  }
`;
