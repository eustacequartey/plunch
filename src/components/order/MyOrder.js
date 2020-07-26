import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { Steps, Button, message, Drawer, notification, Input } from "antd";
import MainDishes from "./MainDishes";
import SideDishes from "./SideDishes";
import Proteins from "./Proteins";
import moment from "moment";
import { AppContext } from "../../context";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import CREATE_ORDER from "../../graphql/mutations/order";
import MY_ORDERS from "../../graphql/queries/myOrders";
import ALL_ORDERS from "../../graphql/queries/order";
const { TextArea } = Input;

const MyOrder = () => {
  const { Step } = Steps;
  const { currentOrder, setSideDish } = React.useContext(AppContext);
  const [createOrder] = useMutation(CREATE_ORDER);
  const [current, setCurrent] = React.useState(0);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState("");

  const steps = [
    {
      title: "Main Dish",
      content: <MainDishes />,
    },
    {
      title: "Side Dish",
      content: <SideDishes />,
    },
    {
      title: "Protein",
      content: <Proteins />,
    },
  ];

  function next() {
    setCurrent(current + 1);
  }

  function prev() {
    setCurrent(current - 1);
  }

  return (
    <MyOrderSheet>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => setVisible(true)}>
            Confirm Order
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>

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
        <div>
          <h4>Main Dish:</h4>
          <p>{currentOrder.mainDish || "Not Selected Yet"}</p>
        </div>

        <div>
          <h4>Side Dish:</h4>
          <p>{currentOrder.sideDish || "Not Selected Yet"}</p>
        </div>

        <div>
          <h4>Protein</h4>
          <p>{currentOrder.protein || "Not Selected Yet"}</p>
        </div>

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

        <div style={{ margin: "1rem 0 0 0 " }}>
          <h4>Comments</h4>
          <TextArea
            rows={8}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </Drawer>
    </MyOrderSheet>
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
          comments,
        },
        refetchQueries: [{ query: MY_ORDERS }, { query: ALL_ORDERS }],
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

  function handleCancel(e) {
    setVisible(false);
  }
};

export default MyOrder;

const MyOrderSheet = styled.div`
  padding: 0 10px;
`;
