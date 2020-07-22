import React from "react";
import styled from "styled-components";

const Switch = () => {
  return (
    <SwitchSheet>
      <div class="button_cont" align="center">
        <span className="example_c"> CONFIRM ORDER</span>
      </div>
    </SwitchSheet>
  );
};

export default Switch;

const SwitchSheet = styled.div`
  cursor: pointer;

  .example_c {
    color: #494949 !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #ffffff;
    padding: 4px;
    border: 2px solid #494949 !important;
    display: inline-block;
    transition: all 0.4s ease 0s;
    margin: 0 0 0 1rem;
  }

  .example_c:hover {
    color: #ffffff !important;
    background: #f6b93b;
    border-color: #f6b93b !important;
    transition: all 0.4s ease 0s;
  }
`;
