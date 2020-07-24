import gql from "graphql-tag";

export default gql`
  {
    orders {
      id
      createdAt
      createdBy {
        email
      }
      createdFor
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
    }
  }
`;
