import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GET_PROTEIN_DISHES from "../../graphql/queries/proteins";
import CREATE_PROTEIN_DISH from "../../graphql/mutations/createProteinDish";
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
  notification,
  Input,
} from "antd";
import { Button as EButton } from "evergreen-ui";
import styled from "styled-components";
const { Option } = Select;

const Protein = () => {
  const { loading, error, data } = useQuery(GET_PROTEIN_DISHES);
  const [visible, setVisible] = React.useState(false);
  const [createProteinDish, { loading1 }] = useMutation(CREATE_PROTEIN_DISH);

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("MISCELLANEOUS");

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
      render: (data, object) => <a>Delete</a>,
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
        dataSource={data && data.proteins}
        pagination={{
          defaultCurrent: 1,
          pageSize: 5,
          total: data && data.proteins.length,
        }}
      />
      <Drawer
        title="Create new protein dish"
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
                  <Option value="MEAT">Meat</Option>
                  <Option value="FISH">Fish</Option>
                  <Option value="MISCELLANEOUS">Miscellaneous</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Sheet>
  );

  function onSubmit() {
    createProteinDish({
      variables: { name, type },
      refetchQueries: [{ query: GET_PROTEIN_DISHES }],
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

export default Protein;

const Sheet = styled.div`
  padding: 0 0;

  .action {
    padding: 0 0 1.2rem 0;
  }
`;
