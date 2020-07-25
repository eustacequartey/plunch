import React from "react";
import { Skeleton, Empty, Table } from "antd";
import GET_ORDERS from "../../graphql/queries/myOrders";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

const columns = [
  {
    title: "CREATED AT",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (data) => <p>{moment(data).calendar()}</p>,
  },
  {
    title: "CREATED FOR",
    dataIndex: "createdFor",
    key: "createdFor",
    render: (data) => (
      <p>
        {moment().calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD/MM/YYYY",
        })}
      </p>
    ),
  },
  {
    title: "DELIVERED",
    dataIndex: "delivered",
    key: "delivered",
    render: (data) => <p>{data.toString()}</p>,
  },
  {
    title: "DELIVERED AT",
    dataIndex: "deliveredAt",
    key: "deliveredAt",
    render: (data) => <p>{data && `${moment(data).calendar()}`}</p>,
  },
  {
    title: "MAIN DISH",
    dataIndex: "main",
    key: "main",
    render: (data) => <p>{data.name}</p>,
  },
  {
    title: "SIDE DISH",
    dataIndex: "side",
    key: "side",
    render: (data) => <p>{data.name}</p>,
  },
  {
    title: "PROTEIN",
    dataIndex: "protein",
    key: "protein",
    render: (data) => <p>{data.name}</p>,
  },
];

const OrderHistory = ({ dataSource }) => {
  return (
    <Table
      locale={{
        filterConfirm: "OK",
        filterReset: "RESET",
      }}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

const OrderHistoryFetch = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <Skeleton />;
  if (error)
    return <Empty description="Failed to fetch. Check Connection and retry" />;

  return <OrderHistory dataSource={data.profile.orders} />;
};

export default OrderHistoryFetch;

// const OrderHistoryFetchBottomSheet = styled.div``;
