import gql from "graphql-tag";

const GET_PROFILE = gql`
  {
    profile {
      firstName
      otherNames
      lastName
      email
      password
    }
  }
`;

export default GET_PROFILE;
