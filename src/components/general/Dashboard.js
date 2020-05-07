import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import search from "../../assets/images/search.png";
import order from "../../assets/images/order1.png";
import charts from "../../assets/images/business.png";
import cash from "../../assets/images/cash.png";
import signs from "../../assets/images/signs.png";
import user from "../../assets/images/user.png";
import settings from "../../assets/images/settings.png";
import heart from "../../assets/images/heart.png";

const Dashboard = (props) => {
  return (
    <StyledDashboard>
      <Toolbar>
        <div>
          <div>
            <StyledImage src={search} />
          </div>
          <div className="subgroup">
            <StyledImage src={order} />
            <StyledImage src={charts} />
            <StyledImage src={cash} />
            <StyledImage src={signs} />
          </div>
        </div>
        <div className="group">
          <StyledImage src={heart} />
          <StyledImage src={settings} />
          <StyledImage src={user} />
        </div>
      </Toolbar>
      <Content>{props.children}</Content>
      <Sidebar>
        <div className="top">
          <p>hello</p>
        </div>
        <div className="bottom"></div>
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
`;

const Sidebar = styled.div`
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  // border: 3px solid red;

  .top {
    background-color: #262444;
    color: #fff;
    flex-basis: 15%;
    display: flex;
    padding: 2rem 0;
  }
`;

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem 0;
`;

// #262444
