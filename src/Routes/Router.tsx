import React from "react";
import Navbar from "../components/layout/Navbar";
import { Route } from "wouter";
import Welcome from "./welcome/Welcome";
import Register from "./auth/Register";
import { supabase } from "../supabaseClient";
import Home from "./home/Home";
import FillProfile from "./profile/FillProfile";
import Profile from "./profile/Profile";

const Router: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Route path="/">
        {supabase.auth.user() !== null ? <Home /> : <Welcome />}
      </Route>
      <Route path="/join">
        <Register />
      </Route>
      <Route path="/fill_profile">
        <FillProfile />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </div>
  );
};

export default Router;
