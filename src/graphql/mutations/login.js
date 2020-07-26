import gql from "graphql-tag";

export default gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        activated
        hasChangedPassword
        role
      }
    }
  }
`;
