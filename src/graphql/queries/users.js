import gql from "graphql-tag";

export default gql`
  {
    users {
      id
      firstName
      otherNames
      lastName
      email
      hasChangedPassword
      role
      activated
    }
  }
`;
