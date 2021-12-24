import React from "react";
import { supabase } from "../../supabaseClient";

const Home: React.FC = () => {
  return (
    <div className="site-container">
      <header className="text-4xl my-12">
        Welcome {supabase.auth.user()?.user_metadata.name}
      </header>
    </div>
  );
};

export default Home;
