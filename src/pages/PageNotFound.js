import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Result, Button } from "antd";

const NotFoundPage = (props) => {
  return (
    <NotFoundPageSheet>
      <div className="header">
        <div>
          <h4>Oops..</h4>
        </div>
      </div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => props.history.push("/")}>
            Back Home
          </Button>
        }
      />
    </NotFoundPageSheet>
  );
};

export default NotFoundPage;

const NotFoundPageSheet = styled.div`
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
    // border: 1px solid;
  }
`;
