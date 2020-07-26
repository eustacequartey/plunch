import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Skeleton, Table, Empty, message, DatePicker } from "antd";
import ORDERS from "../../graphql/queries/order";
import { Button } from "evergreen-ui";
import moment from "moment";
import ConvertToExcel from "./ConvertToExcel";

function Order({}) {
  const { loading, error, data } = useQuery(ORDERS);

  if (loading) return <Skeleton active />;

  if (error) return <Empty description={error.message} />;
  if (data) {
    return <Display data={data} />;
  }
}

export default Order;

function Display({ data }) {
  const orderData = data.orders;
  const [printDate, setPrintDate] = useState(moment());
  const [save, setSave] = useState(false);

  const columns = [
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => <>{moment(data).calendar()}</>,
    },
    {
      title: "CREATED FOR",
      dataIndex: "createdFor",
      key: "createdFor",
      render: (data) => (
        <>
          {moment(data).calendar(null, {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "DD/MM/YYYY",
          })}
        </>
      ),
    },
    {
      title: "CREATED BY",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (data) => <>{data.firstName + " " + data.lastName}</>,
    },
    {
      title: "MAIN DISH",
      dataIndex: "main",
      key: "main",
      render: (data) => <>{data.name}</>,
    },
    {
      title: "SIDE DISH",
      dataIndex: "side",
      key: "side",
      render: (data) => <>{data.name}</>,
    },
    {
      title: "PROTEIN",
      dataIndex: "protein",
      key: "protein",
      render: (data) => <>{data.name}</>,
    },
    {
      title: "DELIVERED",
      dataIndex: "delivered",
      key: "delivered",
      render: (data) => <>{data.toString()}</>,
    },
    {
      title: "DELIVERED AT",
      dataIndex: "deliveredAt",
      key: "deliveredAt",
      render: (data) => <>{data ? moment(data).calendar() : "Unavailable"}</>,
    },
  ];

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <DatePicker onChange={onChange} allowClear={false} />
        <Button
          marginLeft={16}
          marginRight={16}
          appearance="primary"
          intent="none"
          onClick={() => {
            setSave(!save);
            message.success("Done");
          }}>
          Export To Excel Sheet
        </Button>
        {save && <ConvertToExcel />}
      </div>
      <Table bordered dataSource={orderData} columns={columns} />
    </>
  );

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
}
