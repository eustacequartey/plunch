import gql from "graphql-tag";

export default gql`
  {
    orders {
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
      comments
      delivered
      deliveredAt
      feedback
    }
  }
`;
