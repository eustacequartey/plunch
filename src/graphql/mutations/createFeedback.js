import gql from "graphql-tag";

export default gql`
  mutation($id: ID!, $feedback: String!) {
    createFeedback(id: $id, feedback: $feedback) {
      id
    }
  }
`;
