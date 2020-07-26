import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Order, Profile, Users, OrderHistory, Admin } from "../pages";

import { Dashboard } from "../components/general";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Dashboard>
        <Route path="/" exact={true} component={Order} />
        <Route path="/order" component={Order} />
        <Route path="/users" component={Users} />
        <Route path="/profile" component={Profile} />
        <Route path="/history" component={OrderHistory} />
        <Route path="/admin" component={Admin} />
      </Dashboard>
    </Switch>
  </BrowserRouter>
);

export default Router;
