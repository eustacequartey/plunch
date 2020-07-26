import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GET_SIDE_DISHES from "../../graphql/queries/sideDishes";
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
} from "antd";
import { Button as EButton } from "evergreen-ui";
import styled from "styled-components";
const { Option } = Select;

const Side = () => {
  const { loading, error, data } = useQuery(GET_SIDE_DISHES);
  const [visible, setVisible] = React.useState(false);

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
        dataSource={data && data.sidedishes}
        pagination={{
          defaultCurrent: 1,
          pageSize: 5,
          total: data && data.sidedishes.length,
        }}
      />
      <Drawer
        title="Create new side dish"
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
            <Button onClick={onClose} type="primary">
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
                <Input placeholder="Please enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please select a type" }]}>
                <Select placeholder="Please select a type">
                  <Option value="RICE">Rice</Option>
                  <Option value="DUMPLING">Dumpling</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Sheet>
  );
};

export default Side;

const Sheet = styled.div`
  padding: 0 0;

  .action {
    padding: 0 0 1.2rem 0;
  }
`;
