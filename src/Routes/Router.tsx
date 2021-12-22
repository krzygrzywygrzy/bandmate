import React from "react";
import { Provider } from "react-redux";
import Navbar from "../components/layout/Navbar";
import { store } from "../store/store";
import { Route } from "wouter";
import Welcome from "./welcome/Welcome";

const Router: React.FC = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Route path="/">
        <Welcome />
      </Route>
    </Provider>
  );
};

export default Router;
