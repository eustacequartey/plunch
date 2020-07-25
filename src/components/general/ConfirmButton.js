import React, { useState, useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { message, notification, Drawer, Button } from "antd";
import { Spinner } from "evergreen-ui";
import { SingleDatePicker } from "react-dates";
import { AppContext } from "../../context/";
import CREATE_ORDER from "../../graphql/mutations/order";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const ConfirmButton = () => {
  const { currentOrder } = useContext(AppContext);
  const [createOrder] = useMutation(CREATE_ORDER);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ConfirmButtonSheet>
      <button className="button1" onClick={() => setVisible(true)}>
        <p className="text">{loading ? "loading" : "Confirm"}</p>
      </button>
      <Drawer
        title="Confirm Order"
        placement="right"
        closable={false}
        onClose={handleCancel}
        visible={visible}
        width={520}
        footer={
          <div
            style={{
              textAlign: "right",
            }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onConfirm} type="primary" loading={loading}>
              {"Confirm Order"}
            </Button>
          </div>
        }>
        <Selection>
          <h4>Main Dish:</h4>
          <p>{currentOrder.mainDish || "Not Selected Yet"}</p>
        </Selection>

        <Selection>
          <h4>Side Dish:</h4>
          <p>{currentOrder.sideDish || "Not Selected Yet"}</p>
        </Selection>

        <Selection>
          <h4>Protein</h4>
          <p>{currentOrder.protein || "Not Selected Yet"}</p>
        </Selection>

        <div>
          <h4>Created For</h4>
          <SingleDatePicker
            date={date} // momentPropTypes.momentObj or null
            onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
            focused={focused} // PropTypes.bool
            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
            id="your_unique_id"
            numberOfMonths={1}
            isDayBlocked={(day) =>
              day.isBefore(moment()) || day.isAfter(moment().add(1, "week"))
            }
          />
        </div>
      </Drawer>
    </ConfirmButtonSheet>
  );

  function onConfirm() {
    if (currentOrder.mainDish !== "" && currentOrder.sideDish !== "") {
      setLoading(true);
      createOrder({
        variables: {
          createdFor: date.format(),
          main: currentOrder.mainDish,
          side: currentOrder.sideDish,
          protein: currentOrder.protein,
        },
      })
        .then(() => {
          setLoading(false);
          setVisible(false);
          message.success("success");
        })
        .catch((error) => {
          setLoading(false);
          notification["error"]({
            message: "Error",
            description: error.message,
          });
        });
    } else {
      message.warning("Fill Order To Completion");
      setVisible(false);
    }
  }

  function handleOk(e) {
    console.log(e);
    setVisible(false);
  }

  function handleCancel(e) {
    setVisible(false);
  }
};

export default ConfirmButton;

const ConfirmButtonSheet = styled.div`
  .text {
    font-size: 1.2rem;
    font-weight: 1000;
    margin: 0;
    padding: 0 0 0 0;
  }

  h4 {
    font-size: 2rem !important;
  }

  button{
   padding:4px 10px;
  
   margin:0 .5rem;
   box-sizing: border-box;
   text-decoration:none;
  
   text-align:center;
   transition: all 0.2s;
    cursor: pointer;
    
    color: #fff;
    background-color: #718096;
    border: 0.1em solid #718096;
  }
  button:hover {
    background-color: #fff;
    border:1px solid #718096;

    .text{
      color: #718096;
    }
  }

  @media all and (max-width:30em){
   button{
    display:block;
    margin:0.4em auto;
   }
  }
`;

const Selection = styled.div`
  // background-color: tomato;
  border-bottom: 0.5px solid #e2e8f0;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;

  h4 {
    font-size: 1rem;
    font-weight: 800;
    margin: 0;
  }

  p {
    margin: 0;
  }
`;
