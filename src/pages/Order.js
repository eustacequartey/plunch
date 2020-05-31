import React from "react";
import styled from "styled-components";
import { MyOrder } from "../components/order";

const Order = () => {
  return (
    <OrderLayer>
      <div className="personal">
        <MyOrder />
      </div>
    </OrderLayer>
  );
};

export default Order;

const OrderLayer = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid black;
  flex-direction: column;

  .personal {
    display: flex;
    border: 1px solid;
  }
`;
