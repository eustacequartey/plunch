import gql from "graphql-tag";

export default gql`
  mutation($name: String!, $type: MainType!) {
    createMainDish(name: $name, type: $type) {
      id
    }
  }
`;
