import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Order } from "../pages";
import { Dashboard } from "../components/general";
import styled from "styled-components";
import AuthRouter from "./Auth";
import AppRouter from "./AppFront";

const Router = () => {
  const isLoggedIn = false;
  return (
    <StyledApp>
      {isLoggedIn && <AppRouter />}
      {!isLoggedIn && <AuthRouter />}
    </StyledApp>
  );
};

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1;
  // border: 1px solid black;
`;

export default Router;
