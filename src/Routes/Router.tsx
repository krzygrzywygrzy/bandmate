import React from "react";
import { Provider } from "react-redux";
import Navbar from "../components/layout/Navbar";
import { store } from "../store/store";
import { Route } from "wouter";
import Welcome from "./welcome/Welcome";
import Register from "./auth/Register";
import { supabase } from "../supabaseClient";
import Home from "./home/Home";

const Router: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Route path="/">
        {supabase.auth.user !== null ? <Home /> : <Welcome />}
      </Route>
      <Route path="/join">
        <Register />
      </Route>
    </div>
  );
};

export default Router;
