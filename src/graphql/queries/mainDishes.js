import gql from "graphql-tag";

export default gql`
  {
    maindishes {
      id
      name
      type
      # orders {
      #   id
      # }
    }
  }
`;
