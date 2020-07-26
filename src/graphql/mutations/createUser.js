import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation(
    $firstName: String!
    $otherNames: String
    $lastName: String!
    $email: String!
    $phone: String!
    $dob: String!
    $address: String!
  ) {
    createUser(
      data: {
        firstName: $firstName
        otherNames: $otherNames
        lastName: $lastName
        email: $email
        phone: $phone
        dob: $dob
        address: $address
      }
    ) {
      id
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation(
    $firstName: String!
    $otherNames: String
    $lastName: String!
    $email: String!
    $phone: String!
    $dob: String!
    $address: String!
  ) {
    createAdmin(
      data: {
        firstName: $firstName
        otherNames: $otherNames
        lastName: $lastName
        email: $email
        phone: $phone
        dob: $dob
        address: $address
      }
    ) {
      id
    }
  }
`;
