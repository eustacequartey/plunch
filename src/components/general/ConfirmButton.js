import React from "react";
import styled from "styled-components";

const ConfirmButton = () => {
  return (
    <ConfirmButtonSheet>
      <button className="button1">
        <p className="text">CONFIRM</p>
      </button>
    </ConfirmButtonSheet>
  );
};

export default ConfirmButton;

const ConfirmButtonSheet = styled.div`
  .text {
    font-size: 1.5rem;
    font-weight: 1000;
    margin: 0;
    padding: 0 0 0 0;
  }

  button{
   padding:4px 10px;
   border:1px solid #1561ad;
   margin:0 .5rem;
   box-sizing: border-box;
   text-decoration:none;
   font-family:'Roboto',sans-serif;
   font-weight:300;
   color:#000000;
   text-align:center;
   transition: all 0.2s;
    cursor: pointer;
  }
  button:hover{
    color: #fff;
    background-color: #a0d2eb;
    border: 0.1em solid #a0d2eb;

    .text{
      color: #fff;
    }
  }
  @media all and (max-width:30em){
   button{
    display:block;
    margin:0.4em auto;
   }
  }
`;
