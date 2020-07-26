import gql from "graphql-tag";

export default gql`
  {
    proteins {
      id
      name
      type
      # orders {
      #   id
      # }
    }
  }
`;
