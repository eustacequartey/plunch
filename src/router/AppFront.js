import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
  Order,
  Profile,
  Users,
  OrderHistory,
  Admin,
  PageNotFound,
} from "../pages";
import { AppContext } from "../context/";
import { Dashboard } from "../components/general";

const Router = () => {
  return (
    <BrowserRouter>
      <Dashboard>
        <Switch>
          <Route path="/" exact={true}>
            <Redirect to="/order" />
          </Route>
          <Route path="/order" component={Order} />
          <Route path="/users" component={Users} />
          <Route path="/profile" component={Profile} />
          <Route path="/history" component={OrderHistory} />
          {JSON.parse(localStorage.getItem("USER")).role === "ADMIN" && (
            <>
              <Route path="/admin/:sub" component={Admin} />
              <Route path="/admin" exact={true} component={Admin} />
            </>
          )}
          <Route component={PageNotFound} />
        </Switch>
      </Dashboard>
    </BrowserRouter>
  );
};

export default Router;
