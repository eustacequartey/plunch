import React from "react";
import styled from "styled-components";
import moment from "moment";
import numeral from "numeral";
import { useQuery } from "@apollo/react-hooks";
import MY_ORDERS from "../../graphql/queries/myOrders";
import { Spin } from "antd";

const Summary = () => {
  const { error, loading, data } = useQuery(MY_ORDERS);

  console.log(data && data.profile.orders);

  return (
    <StyledSummary>
      <div className="leftSummary">
        <div className="topLeftSummary">
          <h3>Total</h3>
        </div>
        <div className="bottomLeftSummary">
          <h6>( expenses for {moment().format("MMMM")} )</h6>
        </div>
      </div>
      <div className="rightSummary">
        {loading && <Spin size="large" />}
        {data && <h4>GH₵{calculateMonthPrice(data.profile.orders)}</h4>}
      </div>
    </StyledSummary>
  );

  function calculateMonthPrice(orders) {
    const ordersInMonth =
      orders &&
      orders.filter((order) => {
        return (
          moment(order.createdAt).isSameOrAfter(moment().startOf("month")) &&
          moment(order.createdAt).isSameOrBefore(moment().endOf("month"))
        );
      });

    let amountSpent = 0.0;
    ordersInMonth &&
      ordersInMonth.forEach((order) => {
        if (order.main.name.toLowerCase().includes("soup")) {
          amountSpent += 6;
        } else {
          amountSpent += 5;
        }
      });

    return numeral(amountSpent).format("0.00");
  }
};

export default Summary;

const StyledSummary = styled.div`
  background-color: #e2e8f0;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 2rem 2rem;

  .leftSummary {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
  }

  .rightSummary {
    // border: 1px solid black;
  }
  h4 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    padding: 0 0 0 0;
    text-align: center;
    color: #4a5568;
  }

  h3 {
    font-size: 5rem;
  }

  h6 {
    font-size: 0.8rem;
    color: #718096;
  }
`;
