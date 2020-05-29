import React from "react";

const Login = () => {
  return (
    <div className="login">
      <div className="left">
        <div>
          <div className="top-info">
            <h1 className="logo">PERSOL LUNCH</h1>
          </div>
          <div className="info">
            <p>Tag line goes here!</p>
          </div>
        </div>
      </div>

      <div className="right">
        <form className="form">
          <div className="heading">Login</div>
          <div>
            <p className="label">EMAIL</p>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="eg: xyz@persol.net"
            />
          </div>
          <p className="label">PASSWORD</p>
          <input className="input" type="password" name="password" />
          <br />
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
    </div>
  );
};

export default Login;
