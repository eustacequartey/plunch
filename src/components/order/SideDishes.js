import React from "react";
import GET_SIDE_DISHES from "../../graphql/queries/sideDishes";
import { useQuery } from "@apollo/react-hooks";
import { Table, Result, Space, Button } from "antd";
import styled from "styled-components";
import { AppContext } from "../../context/";

const SideDishes = () => {
  const { loading, error, data } = useQuery(GET_SIDE_DISHES);
  const { currentOrder, setSideDish } = React.useContext(AppContext);

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
          <Button onClick={() => setSideDish(record.id)}>
            {currentOrder.sideDish === record.id
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
        dataSource={data && data.sidedishes}
        pagination={{
          defaultCurrent: 1,
          pageSize: 5,
          total: data && data.sidedishes.length,
        }}
      />
    </Sheet>
  );
};

export default SideDishes;

const Sheet = styled.div`
  padding: 4rem 0;
`;
