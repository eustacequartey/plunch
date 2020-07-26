import gql from "graphql-tag";

export default gql`
  query($date: String) {
    orderBatch(date: $date) {
      id
      createdAt
      createdFor
      createdBy {
        firstName
        otherNames
        lastName
        email
      }
      main {
        name
      }
      side {
        name
      }
      protein {
        name
      }
      delivered
      deliveredAt
    }
  }
`;
