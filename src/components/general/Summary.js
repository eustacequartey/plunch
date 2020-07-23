import React from "react";
import styled from "styled-components";

const Summary = () => {
  return (
    <StyledSummary>
      <h4>You have spent: $0.00</h4>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  // border: 1px solid black;
  background-color: #a0d2eb;
  color: #fff;
  width: 100%;
  padding: 3.5rem 1rem;
  border-radius: 1rem;

  h4 {
    font-size: 1.5rem;
    font-weight: 1000;
    margin: 0;
    padding: 0 0 0 0;
    text-align: center;
    color: #718096;
  }
`;
