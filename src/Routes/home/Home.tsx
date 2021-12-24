import React, { useEffect } from "react";
import { supabase } from "../../supabaseClient";

const Home: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <div className="site-container">
      <header>Welcome {JSON.stringify(supabase.auth.user.toString)}</header>
    </div>
  );
};

export default Home;
