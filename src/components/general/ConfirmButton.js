import React from "react";
import styled from "styled-components";
import { AppContext } from "../../context/";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import CREATE_ORDER from "../../graphql/mutations/order";
import { message, notification } from "antd";

const ConfirmButton = () => {
  const { currentOrder } = React.useContext(AppContext);
  const [createOrder, { loading }] = useMutation(CREATE_ORDER);

  return (
    <ConfirmButtonSheet>
      <button className="button1" onClick={onConfirm}>
        <p className="text">{loading ? "loading" : "Confirm"}</p>
      </button>
    </ConfirmButtonSheet>
  );

  function onConfirm() {
    if (currentOrder.mainDish !== "" && currentOrder.sideDish !== "") {
      createOrder({
        variables: {
          createdFor: moment().format(),
          main: currentOrder.mainDish,
          side: currentOrder.sideDish,
          protein: currentOrder.protein,
        },
      })
        .then(({ data }) => {
          message.success("success");
        })
        .catch((error) => {
          notification["error"]({
            message: "Error",
            description: error.message,
          });
        });
    } else {
      message.info("Fill Order");
    }
  }
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
   border:1px solid #718096;
   margin:0 .5rem;
   box-sizing: border-box;
   text-decoration:none;
   color:#000000;
   text-align:center;
   transition: all 0.2s;
    cursor: pointer;
    background-color: #fff;
  }
  button:hover{
    color: #fff;
    background-color: #718096;
    border: 0.1em solid #718096;

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
