import gql from "graphql-tag";

export default gql`
  {
    sidedishes {
      id
      name
      type
      # orders {
      #   id
      # }
    }
  }
`;
