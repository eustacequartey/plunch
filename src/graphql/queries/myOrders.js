import gql from "graphql-tag";

export default gql`
  {
    profile {
      orders {
        id
        delivered
        createdAt
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
      }
    }
  }
`;
