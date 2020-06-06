import React, { useState } from "react";
import logo from "../../assets/images/plogosmall.png";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

const Login = () => {
  return (
    <div className="login">
      <LeftPane />
      <RightPane />
    </div>
  );
};

const LeftPane = () => {
  return (
    <div className="left">
      <div>
        <div className="top-info">
          <img src={logo} className="logo-icon" />
          <h1 className="logo">PERSOL LUNCH</h1>
        </div>
        <div className="info">
          <p className="tagline">Tag line goes here!</p>
        </div>
      </div>
    </div>
  );
};

const RightPane = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);

  return (
    <div className="right">
      <form className="form" onSubmit={onSubmit}>
        <div className="heading">Login Portal</div>
        <div>
          <p className="label">EMAIL</p>
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eg: xyz@persol.net"
          />
        </div>

        <div>
          <p className="label">PASSWORD</p>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="checkbox"
          id="savepassword"
          name="savepassword"
          value="yes"
        />

        <label className="checkbox-label" for="savepassword">
          Remember me?
        </label>
        <div>
          <input className="submit" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );

  async function onSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      notification.open({
        message: "Kindly Fill All Fields",
        description: "All fields in login form are required",
        icon: <CloseCircleOutlined style={{ color: "tomato" }} />,
      });
    }
    // let ret = await login({ variables: { email, password } });
    // console.log(ret);
  }
};

export default Login;
