import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Skeleton,
  Table,
  Empty,
  message,
  Popover,
  DatePicker,
  Button as AntdButton,
  notification,
  Space,
} from "antd";
import ORDERS from "../../graphql/queries/order";
import SET_TODAY_DELIVERED from "../../graphql/mutations/setBatchDelivered";
import SET_DELIVERED from "../../graphql/mutations/setDelivered";
import MY_ORDERS from "../../graphql/queries/myOrders";
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
  const [date, setDate] = useState(moment());
  const [setDelivered, { loading }] = useMutation(SET_DELIVERED);
  const [setTodayDelivered, { loading1 }] = useMutation(SET_TODAY_DELIVERED);
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
    {
      title: "Action",
      key: "operation",

      render: (data, obj) => {
        const content = (
          <div>
            <p>{obj.feedback || "No Feedback Yet"}</p>
          </div>
        );
        return (
          <Space>
            <AntdButton
              ghost={true}
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
              type="primary"
              disabled={data.delivered}
              icon={<CheckCircleOutlined />}
            />
            <Popover content={content} title="Feedback">
              <AntdButton type="primary">Feedback</AntdButton>
            </Popover>
            ,
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <DatePicker
          onChange={onChange}
          allowClear={false}
          defaultValue={moment()}
        />

        <Button
          marginLeft={16}
          appearance="primary"
          intent="none"
          isLoading={loading1}
          onClick={() => {
            setTodayDelivered({
              refetchQueries: [{ query: ORDERS }, { query: MY_ORDERS }],
            })
              .then(() => {
                message.success("Success");
              })
              .catch((error) =>
                notification["error"]({
                  title: "Error",
                  description: error.message,
                })
              );
          }}>
          Set Day Delivered
        </Button>

        <Button
          marginLeft={16}
          marginRight={16}
          appearance="primary"
          intent="none"
          onClick={() => {
            setSave(!save);
          }}>
          Export To Excel Sheet
        </Button>

        {save && <ConvertToExcel date={date.format()} />}
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
    // console.log(date, dateString);
    setDate(date);
  }
}
