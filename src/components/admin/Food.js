import React, { useState } from "react";
import { Card } from "antd";
import MainDishes from "./MainDishes";
import ProteinDishes from "./ProteinDishes";
import SideDishes from "./SideDishes";

const tabListNoTitle = [
  {
    key: "main",
    tab: "Main Dishes",
  },
  {
    key: "side",
    tab: "Side Dishes",
  },
  {
    key: "protein",
    tab: "Proteins",
  },
];

const contentListNoTitle = {
  main: <MainDishes />,
  side: <SideDishes />,
  protein: <ProteinDishes />,
};

function Food() {
  const [noTitleKey, setNoTitleKey] = useState("main");

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

export default Food;
