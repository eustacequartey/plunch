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
        <div>
          <h4>Order</h4>
        </div>
        <div className="rightHeader">
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
    border: 1px solid black;

    .rightHeader {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 1000;
      margin: 0;
      padding: 0 0 0 0;
    }
  }
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;
