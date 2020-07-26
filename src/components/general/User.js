import React, { useRef } from "react";
import Highlighter from "react-highlight-words";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GET_USERS from "../../graphql/queries/users";
import TOGGLE_ACTIVATION from "../../graphql/mutations/toggleActivated";
import { SearchOutlined } from "@ant-design/icons";
import { Button as EverGreenButton } from "evergreen-ui";
import { CREATE_USER, CREATE_ADMIN } from "../../graphql/mutations/createUser";
import moment from "moment";
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
  DatePicker,
  message,
  notification,
} from "antd";

function User({}) {
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  if (loading) return <Skeleton active />;
  if (error) return <Empty description={error.message} />;
  if (data) {
    return <Display data={data} refetch={refetch} />;
  }
}

function Display({ data, refetch }) {
  const userData = data.users;
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [adminVisible, setAdminVisible] = React.useState(false);
  const [toggleActivation] = useMutation(TOGGLE_ACTIVATION);
  const [createUser] = useMutation(CREATE_USER);
  const [createAdmin] = useMutation(CREATE_ADMIN);
  const [loading, setLoading] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [otherNames, setOtherNames] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [address, setAddress] = React.useState("");

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
      render: (data) => <>{data !== "ADMIN" ? "Normal User" : "Admin"}</>,
    },
    {
      title: "ACTIVATED",
      dataIndex: "activated",
      key: "activated",
      render: (data, item) => {
        let val = data;
        return (
          <Switch
            size="small"
            onChange={() => {
              toggleUserActivation(item.id);
            }}
            checked={data}
          />
        );
      },
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: (data) => <>{data.toString()}</>,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (data) => <>{moment(data).format("YYYY/MM/DD")}</>,
    },
  ];

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +233
    </Form.Item>
  );

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
        <EverGreenButton
          marginRight={16}
          marginBottom={16}
          appearance="primary"
          intent="none"
          onClick={() => refetch()}>
          Refresh
        </EverGreenButton>
      </div>

      <Table
        bordered
        dataSource={userData}
        pagination={{
          defaultCurrent: 1,
          total: userData.length,
          pageSize: 5,
        }}
        columns={columns}
      />

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
            <Button onClick={onCreateUser} loading={loading} type="primary">
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
                <Input
                  placeholder="Please enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="otherNames" label="Other Names">
                <Input
                  placeholder="Please enter other names if any"
                  value={otherNames}
                  onChange={(e) => setOtherNames(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}>
                <Input
                  placeholder="Please enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                <Input
                  placeholder="Please enter last name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}>
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date Of Birth"
                rules={[
                  { required: true, message: "Enter your Date Of Birth" },
                ]}>
                <DatePicker
                  defaultValue={moment()}
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  allowClear={false}
                  onChange={(date) => console.log(setDob(date.format()))}
                  disabledDate={(current) =>
                    current < moment().subtract(50, "years") &&
                    current.isAfter(moment().endOf("day"))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "please enter your address",
                  },
                ]}>
                <Input.TextArea
                  rows={4}
                  placeholder="please enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
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
            <Button onClick={onCreateAdmin} loading={loading} type="primary">
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
                <Input
                  placeholder="Please enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="otherNames" label="Other Names">
                <Input
                  placeholder="Please enter other names if any"
                  value={otherNames}
                  onChange={(e) => setOtherNames(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}>
                <Input
                  placeholder="Please enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}>
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date Of Birth"
                rules={[
                  { required: true, message: "Enter your Date Of Birth" },
                ]}>
                <DatePicker
                  defaultValue={moment()}
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  allowClear={false}
                  onChange={(date) => console.log(setDob(date.format()))}
                  disabledDate={(current) =>
                    current < moment().subtract(50, "years") &&
                    current.isAfter(moment().endOf("day"))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "please enter your address",
                  },
                ]}>
                <Input.TextArea
                  rows={4}
                  placeholder="please enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
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
    toggleActivation({
      variables: { id: id },
      refetchQueries: [{ query: GET_USERS }],
    })
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

  function onCreateUser() {
    setLoading(true);
    createUser({
      variables: {
        firstName,
        otherNames,
        lastName,
        email,
        phone,
        dob,
        address,
      },
    })
      .then(() => {
        setLoading(false);
        message.success("Success");
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        onClose();
        notification["error"]({
          message: "Error",
          description: error.message,
        });
      });
  }

  function onCreateAdmin() {
    setLoading(true);
    createUser({
      variables: {
        firstName,
        otherNames,
        lastName,
        email,
        phone,
        dob,
        address,
      },
    })
      .then(() => {
        setLoading(false);
        message.success("Success");
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        onClose();
        notification["error"]({
          message: "Error",
          description: error.message,
        });
      });
  }
}

export default User;
