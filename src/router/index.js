import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Order } from "../pages";
import { Dashboard } from "../components/general";
import styled from "styled-components";

const Router = () => (
  <StyledApp>
    <BrowserRouter>
      <Switch>
        <Dashboard>
          <Route path="/" exact={true} component={Home} />
          <Route path="/order" component={Order} />
        </Dashboard>
      </Switch>
    </BrowserRouter>
  </StyledApp>
);

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1;
  // border: 1px solid black;
`;

export default Router;
