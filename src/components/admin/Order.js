import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Skeleton,
  Table,
  Empty,
  message,
  DatePicker,
  Button as AntdButton,
  notification,
} from "antd";
import ORDERS from "../../graphql/queries/order";
import SET_DELIVERED from "../../graphql/mutations/setDelivered";
import { Button } from "evergreen-ui";
import moment from "moment";
import ConvertToExcel from "./ConvertToExcel";
import { CheckCircleOutlined } from "@ant-design/icons";

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
  const [setDelivered, { loading }] = useMutation(SET_DELIVERED);
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
    // {
    //   title: "Comments",
    //   key: "comments",
    //   key: "comments",
    // width: 100,
    // render: (data) => <p>{data}</p>,
    // },
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
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (data, obj) => (
        <AntdButton
          onClick={() => {
            setDelivered({
              variables: { id: obj.id },
              refetchQueries: [{ query: ORDERS }],
            })
              .then(() => {
                message.success("Successful");
              })
              .catch((error) => {
                notification["error"]({
                  message: "Error",
                  description: error.message,
                });
              });
          }}
          loading={loading}
          type="primary"
          disabled={data.delivered}
          icon={<CheckCircleOutlined />}
        />
      ),
    },
  ];

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <DatePicker onChange={onChange} allowClear={false} />

        <Button
          marginLeft={16}
          // marginRight={16}
          appearance="primary"
          intent="none"
          onClick={() => {
            setSave(!save);
            message.success("Done");
          }}>
          Mark Day Delivered
        </Button>

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
      <Table
        bordered
        dataSource={orderData}
        scroll={{ x: 1000 }}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          total: orderData.length,
          pageSize: 5,
        }}
      />
    </>
  );

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
}
