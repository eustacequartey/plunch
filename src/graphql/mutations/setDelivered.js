import gql from "graphql-tag";

export default gql`
  mutation($id: ID!) {
    setDelivered(id: $id) {
      delivered
      deliveredAt
    }
  }
`;
