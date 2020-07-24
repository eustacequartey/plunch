import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Skeleton } from "antd";

const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      activated
    }
  }
`;

function User({}) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading)
    return (
      <>
        <Skeleton paragraph={{ rows: 1 }} active />;
      </>
    );
  if (error) return `Error! ${error.message}`;
  if (data) {
    return <Display data={data} />;
  }
}

function Display({ data }) {
  const userData = data.users;

  return (
    <div>
      {userData.map((user) => (
        <p>{user.firstName}</p>
      ))}
    </div>
  );
}

export default User;
