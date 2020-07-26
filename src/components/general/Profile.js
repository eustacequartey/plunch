import React, { useState, useContext } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/8603-profile.json";
import { LogoutOutlined } from "@ant-design/icons";
import { Popconfirm, Button, Modal, Form, Input, notification } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { AppContext } from "../../context";
import CHANGE_PASSWORD from "../../graphql/mutations/changePassword";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("USER"));
  const [ModalText, setModalText] = useState(
    "Initial password is generic and must be changed for security purposes."
  );
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { onLogout } = useContext(AppContext);
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  return (
    <ProfileSheet>
      <div className="topProfileSheet">
        <Popconfirm
          placement="bottom"
          title={"Are you sure you want to log out?"}
          onConfirm={extLogout}
          okText="Yes"
          cancelText="No">
          <Button ghost={true} icon={<LogoutOutlined />} />
        </Popconfirm>
      </div>
      <div className="bottomProfileSheet">
        <div className="centerBottomProfileSheet">
          <Lottie options={defaultOptions} height={100} width={100} />
          <h4>{`${user.firstName} ${user.otherNames || ""} ${
            user.lastName
          }`}</h4>
          <h6>{user.role}</h6>
        </div>
      </div>
      <Modal
        title="Enter a new password."
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        closable={false}
        onCancel={handleCancel}
        okButtonProps={{ disabled }}>
        <p>{ModalText}</p>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "Password shouldn't be less than 8 characters!",
              },
            ]}>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    setDisabled(false);
                    return Promise.resolve();
                  }
                  setDisabled(true);
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}>
            <Input.Password value />
          </Form.Item>
        </Form>
      </Modal>
    </ProfileSheet>
  );

  function extLogout() {
    if (JSON.parse(localStorage.getItem("USER")).hasChangedPassword === false) {
      setVisible(true);
    } else {
      onLogout();
    }
  }

  function handleOk() {
    setConfirmLoading(true);
    setModalText(
      "Your new password will be saved and then you will be logged out"
    );
    changePassword({ variables: { newPassword: password } })
      .then(() => {
        setVisible(false);
        setConfirmLoading(false);
        onLogout();
      })
      .catch((error) => {
        notification["error"]({
          message: "Error",
          description: error.message,
        });
      });
  }

  function handleCancel() {
    setVisible(false);
  }

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
};

export default Profile;

const ProfileSheet = styled.div`
  background-color: #2d3748;
  color: #fff;
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 0.5rem 1rem;

  h4 {
    margin: 0;
    color: #f7fafc;
    font-size: 1rem;
    font-weight: 500;
  }
  h6 {
    margin: 0;
    color: #fff;
    font-size: 0.7rem;
  }
  .topProfileSheet {
    flex: 0.1;
  }
  .bottomProfileSheet {
    flex: 0.9;
    display: flex;

    .centerBottomProfileSheet {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const StyledImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0;
`;

// 718096;
