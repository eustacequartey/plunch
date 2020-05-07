import React from "react";
import styled from "styled-components";

const Summary = () => {
  return (
    <StyledSummary>
      <p>Summary</p>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  // border: 1px solid black;
  background-color: tomato;
  color: #fff;
  width: 100%;
  padding: 3.5rem 1rem;
  border-radius: 1rem;
`;
