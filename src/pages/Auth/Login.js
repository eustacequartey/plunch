import React, { useState } from "react";
import logo from "../../assets/images/plogosmall.png";
import { Spinner } from "evergreen-ui";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Mutation } from "react-apollo";

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

function _saveUserData(token) {
  localStorage.setItem("AUTH_TOKEN", token);
}

async function _confirm(data) {
  const { token } = await data.login.token;
  _saveUserData(token);
}

function LoginButton({ email, password, resetInput }) {
  const [login] = useMutation(LOGIN, { onCompleted: resetInput });

  return (
    <div>
      <Mutation
        mutation={login}
        variables={{ email, password }}
        onCompleted={(data) => _confirm(data)}>
        {(mutation) => (
          <button
            aria-hidden="true"
            className="submit"
            type="submit"
            onClick={mutation}>
            {"SUBMIT"}
          </button>
        )}
      </Mutation>
    </div>
  );
}

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

  return (
    <div className="right">
      <form className="form">
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

        <input
          type="checkbox"
          id="savepassword"
          name="savepassword"
          value="yes"
        />

        <label className="checkbox-label" for="savepassword">
          Remember me?
        </label>
        <LoginButton email={email} password={password} resetInput={reset} />
      </form>
    </div>
  );
  function reset() {
    setEmail("");
    setPassword("");
  }
};

export default Login;
