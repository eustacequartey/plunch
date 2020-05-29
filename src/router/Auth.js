import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "../pages/Auth";

const Router = () => (
  <>
    <BrowserRouter>
      <Route path="/*" component={Login} />
    </BrowserRouter>
  </>
);

export default Router;
