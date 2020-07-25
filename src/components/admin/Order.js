import React, { useRef } from "react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@apollo/react-hooks";
import { Skeleton, Table, Switch, Empty, Space, Button, Input } from "antd";
import ORDERS from "../../graphql/queries/order";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function Order({}) {
  const { loading, error, data } = useQuery(ORDERS);

  if (loading) return <Skeleton active />;

  if (error) return <Empty description={error.message} />;
  if (data) {
    return <Display data={data} />;
  }
}

function Display({ data }) {
  const orderData = data.orders;
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  let searchInputRef = useRef();

  const columns = [
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => <>{moment(data).calendar()}</>,
      //   ...getColumnSearchProps("createdAt"),
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
      //   ...getColumnSearchProps("otherNames"),
    },
    {
      title: "CREATED BY",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (data) => <>{data.firstName + " " + data.lastName}</>,
      //   ...getColumnSearchProps("createdBy"),
    },
    {
      title: "MAIN DISH",
      dataIndex: "main",
      key: "main",
      render: (data) => <>{data.name}</>,
      //   ...getColumnSearchProps("main"),
    },
    {
      title: "SIDE DISH",
      dataIndex: "side",
      key: "side",
      render: (data) => <>{data.name}</>,
      //   ...getColumnSearchProps("side"),
    },
    {
      title: "PROTEIN",
      dataIndex: "protein",
      key: "protein",
      render: (data) => <>{data.name}</>,
      //   ...getColumnSearchProps("protein"),
    },
    {
      title: "DELIVERED",
      dataIndex: "delivered",
      key: "delivered",
      render: (data) => <>{data.toString()}</>,
      //   ...getColumnSearchProps("delivered"),
    },
    {
      title: "DELIVERED AT",
      dataIndex: "deliveredAt",
      key: "deliveredAt",
      render: (data) => <>{data ? moment(data).calendar() : "Unavailable"}</>,
      //   ...getColumnSearchProps("createdAt"),
    },
  ];

  return <Table bordered dataSource={orderData} columns={columns} />;

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

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
}

export default Order;
