import React from "react";
import styled from "styled-components";
import { MyOrder } from "../components/order";
import { FoodRow, SideRow, ProteinRow } from "../components/general";
import { Button, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const Order = () => {
  const [selection, setselection] = React.useState("mains");

  return (
    <OrderLayer>
      <Selector>
        <Radio.Group value={selection} onChange={handleselectionChange}>
          <Radio.Button selection={"large"} value="sides">
            Sides
          </Radio.Button>
          <Radio.Button selection={"large"} value="mains">
            Mains
          </Radio.Button>
          <Radio.Button selection={"large"} value="proteins">
            Proteins
          </Radio.Button>
        </Radio.Group>
      </Selector>

      {selection === "mains" && <FoodRow />}
      {selection === "sides" && <SideRow />}
      {selection === "proteins" && <ProteinRow />}
    </OrderLayer>
  );

  function handleselectionChange(e) {
    setselection(e.target.value);
  }
};

export default Order;

const OrderLayer = styled.div`
  display: flex;
  flex: 1;
  border: 1px dotted #e2e8f0;
  flex-direction: column;

  .mainsheader {
    font-size: 1.2rem;
    color: #4a5568;
  }
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;
