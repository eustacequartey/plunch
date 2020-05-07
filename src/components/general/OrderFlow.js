import React from "react";
import styled from "styled-components";
import user from "../../assets/images/check.png";
import { Tag } from "antd";
import "antd/dist/antd.css";

const OrderFlow = (props) => {
  return (
    <StyledOrderFlow>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h2>Rice</h2>
        </div>
        <div>
          <p>with Stew and Eggs</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <StyledImage src={user} />
        </div>
        <div>
          {props.delivered ? (
            <Tag color="green">DELIVERED</Tag>
          ) : (
            <Tag color="orange">ON THE WAY</Tag>
          )}
        </div>
      </div>
    </StyledOrderFlow>
  );
};

export default OrderFlow;

const StyledOrderFlow = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  padding: 3rem 1rem;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  border: 0.3rem solid #eeeeee;
`;

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem 0;
`;
