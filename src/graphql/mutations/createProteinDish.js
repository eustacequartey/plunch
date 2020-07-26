import gql from "graphql-tag";

export default gql`
  mutation($name: String!, $type: ProteinType!) {
    createProtein(name: $name, type: $type) {
      id
    }
  }
`;
