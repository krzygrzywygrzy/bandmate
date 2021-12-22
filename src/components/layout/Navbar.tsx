import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import Popup from "../popups/Popup";

const Navbar: React.FC = () => {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

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
          <div className="flex">
            <div
              className="mr-2 cursor-pointer"
              onClick={() => setLoginPopup(true)}
            >
              Log in
            </div>
            <Link href="/register" className="font-semibold">
              Register
            </Link>
          </div>
        )}
      </div>
      <Popup trigger={loginPopup}></Popup>
    </div>
  );
};

export default Navbar;
