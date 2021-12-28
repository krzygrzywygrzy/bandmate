import React from "react";
import AuthWrapper from "../../components/layout/AuthWrapper";
import { supabase } from "../../supabaseClient";

const Profile: React.FC = () => {
  const handleLogOut = () => {
    supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <AuthWrapper>
      <header className="header flex items-baseline">
        <span className="text-3xl">Profile </span>
        <span className="px-4 cursor-pointer" onClick={handleLogOut}>
          log out
        </span>
      </header>
    </AuthWrapper>
  );
};

export default Profile;
