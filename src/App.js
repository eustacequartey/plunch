import React from "react";
import "./App.css";
import Router from "./router";
import { Provider } from "./context";

function App() {
  return (
    <>
      <Provider>
        <Router />
      </Provider>
    </>
  );
}

export default App;
