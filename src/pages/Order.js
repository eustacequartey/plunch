import React from "react";
import styled from "styled-components";
import { ConfirmButton } from "../components/general/";
import { FoodRow, SideRow, ProteinRow } from "../components/general";
import { Button, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const Order = () => {
  const [selection, setselection] = React.useState("mains");

  return (
    <OrderLayer>
      <div className="header">
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
        <ConfirmButton />
      </div>

      <div>
        {selection === "mains" && <FoodRow />}
        {selection === "sides" && <SideRow />}
        {selection === "proteins" && <ProteinRow />}
      </div>
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

  .header {
    // border: 1px solid black;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
  }
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;
