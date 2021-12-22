import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const Navbar: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    if (Cookies.get("auth") === undefined) {
      setAuthenticated(false);
    } else setAuthenticated(true);
  });

  return (
    <div className="flex justify-between mx-32">
      <div>
        <Link href="/">BandMate</Link>
      </div>
      <div>
        {authenticated ? (
          <div>account</div>
        ) : (
          <div>
            <Link href="/login" className="mr-2">
              Log in
            </Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
