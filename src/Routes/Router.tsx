import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navbar from "../components/layout/Navbar";
import { store } from "../store/store";
import Home from "./home/Home";

const Router: React.FC = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Home />
    </Provider>
  );
};

export default Router;
