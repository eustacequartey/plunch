import gql from "graphql-tag";

const GET_PROFILE = gql`
  {
    profile {
      firstName
      otherNames
      lastName
      email
      password
      activated
      role
      dob
      address
      phone
    }
  }
`;

export default GET_PROFILE;
