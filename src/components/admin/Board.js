import React from "react";
import User from "../general/User";
import Order from "./Order";
import Food from "./Food";
import { Card } from "antd";

const tabListNoTitle = [
  {
    key: "users",
    tab: "User Management",
  },
  {
    key: "orders",
    tab: "Order Management",
  },
  {
    key: "food",
    tab: "Food Management",
  },
];

const contentListNoTitle = {
  users: <User />,
  orders: <Order />,
  food: <Food />,
};

function Board() {
  const [noTitleKey, setNoTitleKey] = React.useState("users");

  function onTabChange(key, type) {
    setNoTitleKey(key);
  }

  return (
    <>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={noTitleKey}
        onTabChange={(key) => {
          onTabChange(key, "noTitleKey");
        }}>
        {contentListNoTitle[noTitleKey]}
      </Card>
    </>
  );
}

export default Board;
