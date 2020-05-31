import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";

const MyOrder = () => {
  return (
    <MyOrderSheet>
      <div>
        <h2>My Order</h2>
      </div>

      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          //   border: "1px solid black",
        }}>
        <div>
          <h3 className="header">Main</h3>
          <p>Groundnut soup</p>
        </div>
        <div>
          <h3 className="header">Side</h3>
          <p>Rice</p>
        </div>
        <div>
          <h3 className="header">Protein</h3>
          <p>Goat Meat</p>
        </div>
      </div>
      <div>
        <p>Price: GHS 5.00</p>
      </div>
    </MyOrderSheet>
  );
};

export default MyOrder;

const MyOrderSheet = styled.div`
  background-color: #fff;
  display: flex;
  //   border: 1px solid red;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem 2rem;
  margin-left: auto;

  .header {
    font-size: 1.2rem;
  }
`;
