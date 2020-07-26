import React, { useContext } from "react";
import GET_MAIN_DISHES from "../../graphql/queries/mainDishes";
import { useQuery } from "@apollo/react-hooks";
import { Table, Result, Space, Button } from "antd";
import styled from "styled-components";
import { AppContext } from "../../context/";

const MainDishes = () => {
  const { loading, error, data } = useQuery(GET_MAIN_DISHES);
  const { currentOrder, setMainDish } = useContext(AppContext);

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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (data, object) => (
        <>{object.type === "SOUP" ? "GH₵ 6" : "GH₵ 5"}</>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => setMainDish(record.id)}>
            {currentOrder.mainDish === record.id
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
        dataSource={data && data.maindishes}
        pagination={{
          defaultCurrent: 1,
          pageSize: 5,
          total: data && data.maindishes.length,
        }}
      />
    </Sheet>
  );
};

export default MainDishes;

const Sheet = styled.div`
  padding: 4rem 0;
`;
