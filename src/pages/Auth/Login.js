import React, { useState, useContext } from "react";
import logo from "../../assets/images/plogosmall.png";
import { Spinner } from "evergreen-ui";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AppContext } from "../../context/";
import { notification, Space } from "antd";

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        activated
        hasChangedPassword
        role
      }
    }
  }
`;

function _saveUserData(token, user) {
  localStorage.setItem("AUTH_TOKEN", token);
  localStorage.setItem("USER", JSON.stringify(user));
}

async function _confirm(data) {
  const { token } = await data.login.token;
  _saveUserData(token);
}

const Login = () => {
  return (
    <div className="login">
      {/* <LeftPane /> */}
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
  const [login, { loading }] = useMutation(LOGIN);
  const { toggleLoggedIn } = useContext(AppContext);

  return (
    <div>
      <img className="logo" src={logo} />

      <div className="right">
        <form
          className="form"
          onSubmit={(e) => {
            loginFunction(e);
          }}
        >
          <div className="heading">Login Portal</div>
          <div>
            <p className="label">EMAIL</p>
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eg: xyz@persol.net"
              required
            />
          </div>

          <div>
            <p className="label">PASSWORD</p>
            <input
              className="input"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button aria-hidden="true" className="submit" type="submit">
            {loading ? "loading" : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );

  function loginFunction(e) {
    e.preventDefault();

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

  function reset() {
    setEmail("");
    setPassword("");
  }
};

export default Login;
