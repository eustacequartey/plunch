import React from "react";
import styled from "styled-components";
import search from "../../assets/images/search.png";
import order from "../../assets/images/order1.png";
import charts from "../../assets/images/business.png";
import cash from "../../assets/images/cash.png";
import signs from "../../assets/images/signs.png";
import user from "../../assets/images/user.png";
import settings from "../../assets/images/settings.png";
import heart from "../../assets/images/heart.png";
import users from "../../assets/images/users.png";
import { NavLink } from "react-router-dom";
import Summary from "./Summary";
import OrderFlowContainer from "./OrderFlowContainer";
import Profile from "./Profile";

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
            <NavLink to="/users">
              <StyledImage src={users} />
            </NavLink>

            <StyledImage src={cash} />
            <StyledImage src={signs} />
          </div>
        </div>
        <div className="group">
          <StyledImage src={heart} />
          <NavLink to="/profile" exact={true}>
            <StyledImage src={settings} />
          </NavLink>
          <NavLink to="/" exact={true}>
            <StyledImage src={user} />
          </NavLink>
        </div>
      </Toolbar>
      <Content>{props.children}</Content>
      <Sidebar>
        <Profile />
        <div className="bottom">
          <div className="topBottomSidebar">
            <div>
              <h3 style={{ fontSize: "2rem", color: "#  4A5568" }}>
                Orders {<span style={{ color: "#718096" }}>Flow</span>}
              </h3>
            </div>

            <OrderFlowContainer />
          </div>
          <div className="bottomBottomSidebar">
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
  flex-basis: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  justify-content: space-between;
  max-height: 100vh;

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
  display: flex;
  // flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;
  background-color: #f4f6fa;
  padding: 2rem 2rem 0 2rem;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Sidebar = styled.div`
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  max-height: 100vh;

  @media only screen and (max-width: 1151px) {
    display: none;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2rem 0 0 0;
    background: linear-gradient(
      to bottom,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #ffffff,
      #e2e8f0,
      #e2e8f0,
      #e2e8f0
    );

    .topBottomSidebar {
      flex: 0.7;
      padding: 0 2rem;
    }

    .bottomBottomSidebar {
      display: flex;
      flex: 0.3;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 1000;
      margin: 0;
    }

    .title {
      font-size: 3rem;
    }
  }
`;

const StyledImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 1rem 0;
`;

// #262444
