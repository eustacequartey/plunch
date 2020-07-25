import gql from "graphql-tag";

export default gql`
  {
    profile {
      orders {
        id
        delivered
        deliveredAt
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
