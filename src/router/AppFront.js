import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Order, Users } from "../pages";
import { Dashboard } from "../components/general";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Dashboard>
        <Route path="/" exact={true} component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/users" component={Users} />
      </Dashboard>
    </Switch>
  </BrowserRouter>
);

export default Router;
