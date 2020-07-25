import React from "react";
import styled from "styled-components";
import OrderHistoryFetch from "../components/general/OrderHistoryFetch";

import animationData from "../assets/lottie/4776-graph.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const OrderHistory = () => {
  return (
    <OrderHistoryBottomSheet>
      <div className="header">
        <div>
          <h4>Order History</h4>
        </div>
      </div>
      <div className="content">
        <OrderHistoryFetch />
      </div>
    </OrderHistoryBottomSheet>
  );
};

export default OrderHistory;

const OrderHistoryBottomSheet = styled.div`
  display: flex;
  flex: 1;
  border: 1px dotted #e2e8f0;
  flex-direction: column;
  p {
    margin: 0;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 1000;
    margin: 0;
    padding: 0 0 0 0;
    color: #718096;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
  }

  .content {
    // border: 1px solid;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;
