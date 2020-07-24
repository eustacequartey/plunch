import React from "react";
import styled from "styled-components";
import OrderFlow from "./OrderFlow";

export default () => {
  return (
    <OrderFlowContainerSheet>
      <OrderFlow delivered={true} />
      <OrderFlow delivered={true} />
      <OrderFlow />
      <OrderFlow delivered={true} />
    </OrderFlowContainerSheet>
  );
};

const OrderFlowContainerSheet = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 0;
  //   border: 1px solid black;
`;
