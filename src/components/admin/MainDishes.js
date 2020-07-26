import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GET_MAIN_DISHES from "../../graphql/queries/mainDishes";
import CREATE_MAIN_DISH from "../../graphql/mutations/createMainDish";
import {
  Table,
  Button,
  message,
  Space,
  Result,
  Drawer,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  notification,
} from "antd";
import { Button as EButton } from "evergreen-ui";
import styled from "styled-components";
const { Option } = Select;
const Main = () => {
  const { loading, error, data } = useQuery(GET_MAIN_DISHES);
  const [createMainDish, { loading1 }] = useMutation(CREATE_MAIN_DISH);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("SOUP");

  function showDrawer() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

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
          <Button onClick={() => message.success("Hi")}></Button>
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
      <div className={"action"}>
        <EButton appearance="primary" onClick={showDrawer}>
          New
        </EButton>
      </div>
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
      <Drawer
        title="Create new main dish"
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
            <Button onClick={onSubmit} loading={loading1} type="primary">
              Submit
            </Button>
          </div>
        }>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}>
                <Input
                  placeholder="Please enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please select a type" }]}>
                <Select
                  placeholder="Please select a type"
                  value={type}
                  onChange={(value) => setType(value)}>
                  <Option value="STEW">Stew</Option>
                  <Option value="SOUP">Soup</Option>
                  <Option value="HOTSAUCE">Sauce</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Sheet>
  );

  function onSubmit() {
    createMainDish({
      variables: { name, type },
      refetchQueries: [{ query: GET_MAIN_DISHES }],
    })
      .then(() => {
        message.success("Successful");
        onClose();
      })
      .catch((error) => {
        return notification["error"]({
          description: error.message,
          message: "Error",
        });
      });
  }
};

export default Main;

const Sheet = styled.div`
  padding: 0 0;

  .action {
    padding: 0 0 1.2rem 0;
  }
`;
