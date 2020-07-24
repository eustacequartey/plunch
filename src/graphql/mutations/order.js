import gql from "graphql-tag";

const CREATE_ORDER = gql`
  mutation LOGIN(
    $createdBy: String!
    $main: String!
    $side: String!
    $protein: String!
  ) {
    login(
      data: {
        createdBy: $createdBy
        main: $main
        side: $side
        protein: $protein
      }
    ) {
      token
      user {
        id
        createdAt
        createdFor
        createdBy
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

export default CREATE_ORDER;
