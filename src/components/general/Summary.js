import React from "react";
import styled from "styled-components";

const Summary = () => {
  return (
    <StyledSummary>
      <div className="leftSummary">
        <div className="topLeftSummary">
          <h3>Total</h3>
        </div>
        <div className="bottomLeftSummary">
          <h6>( expenses for July )</h6>
        </div>
      </div>
      <div className="rightSummary">
        <h4>$5.55</h4>
      </div>
    </StyledSummary>
  );
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
    // border: 1px solid black;s
    display: flex;
    flex-direction: column;
  }

  .rightSummary {
    // border: 1px solid black;
  }
  h4 {
    font-size: 4rem;
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
