import React, { useContext } from "react";
import styled from "styled-components";
import AuthRouter from "./Auth";
import AppRouter from "./AppFront";
import { AppContext } from "../context/";

const Router = () => {
  const { isLoggedIn } = useContext(AppContext);
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
