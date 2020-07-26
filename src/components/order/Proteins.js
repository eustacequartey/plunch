import React from "react";
import GET_PROTEINS from "../../graphql/queries/proteins";
import { useQuery } from "@apollo/react-hooks";
import { Table, Result, Space, Button } from "antd";
import styled from "styled-components";
import { AppContext } from "../../context";

const Proteins = () => {
  const { loading, error, data } = useQuery(GET_PROTEINS);
  const { currentOrder, setProtein } = React.useContext(AppContext);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => setProtein(record.id)}>
            {currentOrder.protein === record.id
              ? "Added To Order"
              : "Add To Order"}{" "}
          </Button>
        </Space>
      ),
    },
  ];

  if (error)
    return (
      <Result
        status="500"
        title="500"
        subTitle={`Sorry, something went wrong ${error.message}`}
      />
    );

  return (
    <Sheet>
      <Table
        columns={columns}
        loading={loading}
        bordered={true}
        dataSource={data && data.proteins}
        pagination={{
          defaultCurrent: 1,
          pageSize: 5,
          total: data && data.proteins.length,
        }}
      />
    </Sheet>
  );
};

export default Proteins;

const Sheet = styled.div`
  padding: 4rem 0;
`;
