import gql from "graphql-tag";

export default gql`
  mutation($createdFor: String!, $main: ID!, $side: ID!, $protein: ID!) {
    createOrder(
      data: {
        createdFor: $createdFor
        main: $main
        side: $side
        protein: $protein
      }
    ) {
      id
      createdAt
      createdFor
      createdBy {
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
    }
  }
`;
