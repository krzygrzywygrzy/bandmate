import React from "react";
import { supabase } from "../../supabaseClient";
import AuthWrapper from "../../components/layout/AuthWrapper";
import HomeSwiping from "./HomeSwiping";

const Home: React.FC = () => {
  return (
    <AuthWrapper>
      <header className="text-4xl my-12">
        Welcome {supabase.auth.user()?.user_metadata.name}
      </header>
      <HomeSwiping />
    </AuthWrapper>
  );
};

export default Home;
