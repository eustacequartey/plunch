import React, { useState, useContext } from "react";
import logo from "../../assets/images/plogosmall.png";
import { Spinner } from "evergreen-ui";
import { useMutation } from "@apollo/react-hooks";
import { AppContext } from "../../context/";
import { notification, Space, Form, Input, Button } from "antd";
import styled from "styled-components";
import LOGIN from "../../graphql/mutations/login";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function _saveUserData(token, user) {
  localStorage.setItem("AUTH_TOKEN", token);
  localStorage.setItem("USER", JSON.stringify(user));
}

async function _confirm(data) {
  const { token } = await data.login.token;
  _saveUserData(token);
}

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, { loading }] = useMutation(LOGIN);
  const { toggleLoggedIn } = useContext(AppContext);

  return (
    <LoginSheet>
      <div className="innerLogin">
        <div className="innerLoginHeader">
          <img src={logo} />
        </div>

        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "You must input a valid email address",
              },
            ]}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginSheet>
  );

  async function onFinish(values) {
    console.log("Success:", values);
    await onSubmit();
  }

  async function onSubmit() {
    if (email === "" || password === "") {
      return notification["error"]({
        message: "Error",
        description: "All fields are required",
      });
    }

    login({ variables: { email, password } })
      .then(({ data }) => {
        _saveUserData(data.login.token, data.login.user);
        toggleLoggedIn();
      })
      .catch((error) => {
        notification["error"]({
          message: "Error",
          description: error.message,
        });
      });
  }

  function onFinishFailed(errorInfo) {
    console.log(errorInfo);
  }
};

export default Login;

const LoginSheet = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #edf2f7;
  justify-content: center;
  align-items: center;

  .innerLogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border: 1px solid black;

    .innerLoginHeader {
      padding: 0 0 2rem 0;
      // background-color: tomato;
    }
  }
`;
