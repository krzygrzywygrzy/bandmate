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
    <div className="flex justify-between site-container py-4">
      <div>
        <Link href="/" className="font-semibold text-purple-600">
          BandMate
        </Link>
      </div>
      <div>
        {authenticated ? (
          <div>account</div>
        ) : (
          <div>
            <Link href="/login" className="mr-2">
              Log in
            </Link>
            <Link href="/register" className="font-semibold">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
