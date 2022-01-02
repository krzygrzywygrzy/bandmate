import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Route } from "wouter";
import Welcome from "./welcome/Welcome";
import Register from "./auth/Register";
import { supabase } from "../supabaseClient";
import Home from "./home/Home";
import FillProfile from "./profile/FillProfile";
import Profile from "./profile/Profile";
import { RealtimeSubscription } from "@supabase/supabase-js";
import Chats from "./chats/Chats";

const Router: React.FC = () => {
  useEffect(() => {
    const matchesSubscription = supabase
      .from(`match:user_id=eq.${supabase.auth.user()?.id}`)
      .on(`UPDATE`, (payload) => {
        //TODO: show info about new match
      })
      .subscribe();

    let chatSubscription: undefined | RealtimeSubscription;

    //TODO: get chat data

    supabase
      .from("match")
      .select("chat_id")
      .eq("user_id", supabase.auth.user()?.id)
      .then((res) => {
        if (res.error) {
          //handle error
        } else if (res.data) {
          if (res.data.length != 0) {
            const chats = res.data[0].chat_id.toString();

            chatSubscription = supabase
              .from(`chat:id=in.(${chats})`)
              .on("UPDATE", (payload) => {
                //TODO: dispatch accurate acition
              })
              .subscribe();
          }
        }
      });

    return () => {
      matchesSubscription.unsubscribe();
      if (chatSubscription instanceof RealtimeSubscription)
        chatSubscription.unsubscribe();
    };
  }, []);

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
      <Route path="/chats">
        <Chats />
      </Route>
      <Route path="/chats/:id">
        {(params) => <Chats chat_id={params.id} />}
      </Route>
    </div>
  );
};

export default Router;
