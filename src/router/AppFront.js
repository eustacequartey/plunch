import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Order } from "../pages";
import { Dashboard } from "../components/general";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Dashboard>
        <Route path="/" exact={true} component={Home} />
        <Route path="/order" component={Order} />
      </Dashboard>
    </Switch>
  </BrowserRouter>
);

export default Router;
