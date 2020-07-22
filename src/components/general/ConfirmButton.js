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
    margin: 0;
    padding: 0;
    font-weight: 1000;
    align-self: center;
  }

  button{
   display:inline-block;
   padding:4px 10px;
   border:0.1em solid black;
   margin:0 0 0 1rem;
   border-radius:1rem;
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
   color:#ffffff;
   background-color:#000000;
  }
  @media all and (max-width:30em){
   button{
    display:block;
    margin:0.4em auto;
   }
  }
`;
