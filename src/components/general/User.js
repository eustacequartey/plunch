import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Skeleton, Table, Switch } from "antd";
const { Column } = Table;
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
  //   userData.forEach((user) => {
  //     if (user.activated == true) {
  //       user.activated = "Activated";
  //     } else {
  //       user.activated = "Not Activated";
  //     }
  //   });

  console.log(userData);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    // {
    //   title: "Status",
    //   dataIndex: "activated",
    //   key: "activated",
    // },
    {
      title: "Activate",
      key: "activate",
      render: (text, record) => <Switch />,
    },
  ];

  return (
    <div>
      <Table dataSource={userData} columns={columns} />
    </div>
  );
}

export default User;
