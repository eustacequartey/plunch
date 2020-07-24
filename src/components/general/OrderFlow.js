import React from "react";
import styled from "styled-components";
import user from "../../assets/images/check.png";
import { Tag } from "antd";
import "antd/dist/antd.css";

import Lottie from "react-lottie";
import animationData from "../../assets/lottie/delivereddfkm.json";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const OrderFlow = (props) => {
  return (
    <StyledOrderFlow>
      <div className="leftOrderFlow">
        {props.delivered ? (
          <Lottie options={defaultOptions} />
        ) : (
          <StyledImage src={user} />
        )}
      </div>
      <div className="rightOrderFlow">
        <div className="topRightOrderFlow">
          <h4>Yesterday</h4>
          <h5>8:29am</h5>
        </div>
        <div className="bottomRightOrderFlow">
          <Tag color={props.delivered === true ? "success" : "orange"}>
            {props.delivered === true ? "delivered" : "pending"}
          </Tag>
          <h6>{props.delivered === true ? "12:56pm" : "..."}</h6>
        </div>
      </div>
    </StyledOrderFlow>
  );
};

export default OrderFlow;

const StyledOrderFlow = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  padding: 0 0;
  align-items: center;
  margin: 0 0;
  border-bottom: 0.1px solid #edf2f7;
  h4 {
    font-size: 15px;
    font-weight: 900;
    margin: 0;
  }

  h5 {
    // font-size: 13px;
    font-weight: 900;
    margin: 0;
  }

  .leftOrderFlow {
    flex: 0.1;
    // border: 1px solid tomato;
    padding: 1em 1em;
    color: red;
    justify-content: center;
    align-item: center;
  }

  .rightOrderFlow {
    display: flex;
    flex-direction: column;
    flex: 0.9;
    // border: 1px solid black;

    .topRightOrderFlow {
      // border: 1px solid black;
      padding: 0.3em 0 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bottomRightOrderFlow {
      // border: 1px solid black;
      padding: 0 0 0.3em 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
`;
