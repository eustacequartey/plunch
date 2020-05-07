import React from "react";
import styled from "styled-components";
import search from "../../assets/images/search.png";
import order from "../../assets/images/order1.png";
import charts from "../../assets/images/business.png";
import cash from "../../assets/images/cash.png";
import signs from "../../assets/images/signs.png";
import user from "../../assets/images/user.png";
import settings from "../../assets/images/settings.png";
import avatar from "../../assets/images/avatar.png";
import heart from "../../assets/images/heart.png";
import bell from "../../assets/images/bell.png";
import { NavLink } from "react-router-dom";
import OrderFlow from "./OrderFlow";
import Summary from "./Summary";

const Dashboard = (props) => {
  return (
    <StyledDashboard>
      <Toolbar>
        <div>
          <div>
            <StyledImage src={search} />
          </div>
          <div className="subgroup">
            <NavLink to="/order" exact={true}>
              <StyledImage src={order} />
            </NavLink>
            <StyledImage src={charts} />
            <StyledImage src={cash} />
            <StyledImage src={signs} />
          </div>
        </div>
        <div className="group">
          <StyledImage src={heart} />
          <StyledImage src={settings} />
          <NavLink to="/" exact={true}>
            <StyledImage src={user} />
          </NavLink>
        </div>
      </Toolbar>
      <Content>{props.children}</Content>
      <Sidebar>
        <div className="top">
          <div className="widget">
            <div style={{ display: "flex", alignItems: "center" }}>
              <StyledImage src={avatar} />
              <p style={{ padding: "0 .5rem" }}>Hello, User</p>
            </div>

            <div style={{ display: "flex" }}>
              <StyledImage src={bell} />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div>
            <h3 style={{ fontSize: "2rem" }}>
              Orders {<span style={{ color: "#979797" }}>Flow</span>}
            </h3>
          </div>
          <div>
            <OrderFlow />
            <OrderFlow delivered={true} />
          </div>
          <div style={{ marginTop: "auto" }}>
            <Summary />
          </div>
        </div>
      </Sidebar>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  flex: 1;
`;

const Toolbar = styled.div`
  flex-basis: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  justify-content: space-between;

  .subgroup {
    margin: 3rem 0 0 0;
    display: flex;
    flex-direction: column;
  }

  .group {
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: #f4f6fa;
  padding: 2rem 2rem 0 2rem;
`;

const Sidebar = styled.div`
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  .top {
    background-color: #262444;
    color: #fff;
    flex-basis: 13%;
    display: flex;
    padding: 0 2rem;
    align-items: center;

    .widget {
      display: flex;
      flex: 1;
      justify-content: space-between;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2rem 2rem;

    .title {
      font-size: 3rem;
    }
  }
`;

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem 0;
`;

// #262444
