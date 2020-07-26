import gql from "graphql-tag";

export default gql`
  mutation($name: String!, $type: SideType!) {
    createSideDish(name: $name, type: $type) {
      id
    }
  }
`;
