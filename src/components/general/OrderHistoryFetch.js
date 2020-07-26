import React from "react";
import {
  Skeleton,
  Empty,
  Table,
  Drawer,
  Form,
  Input,
  Col,
  Row,
  Button,
  message,
  notification,
} from "antd";
import GET_ORDERS from "../../graphql/queries/myOrders";
import { useQuery, useMutation } from "@apollo/react-hooks";
import CREATE_FEEDBACK from "../../graphql/mutations/createFeedback";
import moment from "moment";

const OrderHistory = ({ dataSource }) => {
  const [visible, setVisible] = React.useState();
  const [createFeedback, { loading }] = useMutation(CREATE_FEEDBACK);
  const [feedback, setFeedback] = React.useState("");
  const [id, setId] = React.useState("");

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
          {moment(data).calendar(null, {
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (data, obj) => {
        return (
          <a
            onClick={() => {
              setVisible(true);
              setId(obj.id);
            }}>
            {obj.delivered && "Feedback"}
          </a>
        );
      },
    },
  ];

  function onClose() {
    setVisible(false);
  }
  return (
    <>
      <Table
        locale={{
          filterConfirm: "OK",
          filterReset: "RESET",
        }}
        bordered={true}
        pagination={{
          defaultCurrent: 1,
          total: dataSource.length,
          pageSize: 5,
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <Drawer
        title="Send Feedback"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onSubmit} loading={loading} type="primary">
              Submit
            </Button>
          </div>
        }>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="feedback"
                label="Feedback"
                rules={[
                  {
                    required: true,
                    message: "please enter feedback",
                  },
                ]}>
                <Input.TextArea
                  rows={4}
                  placeholder="Enter Feedback Here"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );

  function onSubmit() {
    createFeedback({
      variables: { id, feedback },
      refetchQueries: [{ query: GET_ORDERS }],
    })
      .then(() => {
        setVisible(false);
        setId("");
        setFeedback("");
        message.success("Sent Successfully!");
      })
      .catch((error) => {
        return notification["error"]({
          message: "Error",
          description: error.message,
        });
      });
  }
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
