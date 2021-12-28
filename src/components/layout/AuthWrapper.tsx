import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "../../supabaseClient";

const AuthWrapper: React.FC = ({ children }) => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (!supabase.auth.user()?.user_metadata.filled)
      setLocation("/fill_profile");
  });

  return <div className="site-container">{children}</div>;
};

export default AuthWrapper;
