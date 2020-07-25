import React, { useRef } from "react";
import Highlighter from "react-highlight-words";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Skeleton,
  Table,
  Switch,
  Empty,
  Space,
  Button,
  Input,
  Drawer,
  Form,
  Col,
  Row,
  Select,
  DatePicker,
  message,
  notification,
} from "antd";
import GET_USERS from "../../graphql/queries/users";
import TOGGLE_ACTIVATION from "../../graphql/mutations/toggleActivated";
import { SearchOutlined } from "@ant-design/icons";
import { Button as EverGreenButton } from "evergreen-ui";
const { Option } = Select;

function User({}) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Skeleton active />;
  if (error) return <Empty description={error.message} />;
  if (data) {
    return <Display data={data} />;
  }
}

function Display({ data }) {
  const userData = data.users;
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [adminVisible, setAdminVisible] = React.useState(false);
  const [toggleActivation] = useMutation(TOGGLE_ACTIVATION);
  let searchInputRef = useRef();

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Other Names",
      dataIndex: "otherNames",
      key: "otherNames",
      ...getColumnSearchProps("otherNames"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "EMAIL ADDRESS",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",

      render: (data) => <>{data === "NORMAL_USER" ? "Normal User" : "Admin"}</>,
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "FIRST LOGIN",
      dataIndex: "hasChangedPassword",
      key: "hasChangedPassword",
      render: (data) => <>{data.toString()}</>,
    },
    {
      title: "ACTIVATED",
      dataIndex: "activated",
      key: "activated",
      render: (data, item) => (
        <Switch
          onChange={() => {
            console.log(item);
            // toggleUserActivation(id);
          }}
          checked={data}
        />
      ),
    },
  ];

  return (
    <>
      <div>
        <EverGreenButton
          marginRight={16}
          marginBottom={16}
          appearance="primary"
          intent="none"
          onClick={showDrawer}>
          New User
        </EverGreenButton>
        <EverGreenButton
          marginRight={16}
          marginBottom={16}
          appearance="primary"
          intent="none"
          onClick={() => showDrawer("admin")}>
          New Administrator
        </EverGreenButton>
      </div>
      <Table bordered dataSource={userData} columns={columns} />
      <Drawer
        title="Add New User"
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
            <Col span={8}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter first name" },
                ]}>
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="otherNames" label="Other Name">
                <Input placeholder="Please enter other names if any" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}>
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                  { required: true, message: "Please enter email address" },
                ]}>
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}>
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Activated">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        title="Add New Administrator"
        width={720}
        onClose={onClose}
        visible={adminVisible}
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
            <Col span={8}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter first name" },
                ]}>
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="otherNames" label="Other Name">
                <Input placeholder="Please enter other names if any" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}>
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                  { required: true, message: "Please enter email address" },
                ]}>
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}>
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Activated">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInputRef = node;
            }}
            placeholder={"Search"}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}>
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function toggleUserActivation(id) {
    toggleActivation({ variables: { id: id } })
      .then(() => {
        message.success("success");
      })
      .catch((error) => {
        notification["error"]({
          message: "Error",
          description: error.message,
        });
      });
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  function showDrawer(key) {
    if (key === "admin") {
      return setAdminVisible(true);
    } else {
      return setVisible(true);
    }
  }

  function onClose() {
    setVisible(false);
    setAdminVisible(false);
  }
}

export default User;
