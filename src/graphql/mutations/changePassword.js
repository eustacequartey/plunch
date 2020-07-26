import gql from "graphql-tag";

export default gql`
  mutation($newPassword: String!) {
    changeFirstPassword(newPassword: $newPassword)
  }
`;
