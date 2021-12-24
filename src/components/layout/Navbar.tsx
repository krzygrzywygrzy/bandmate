import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "wouter";
import Login from "../auth/Login";
import Popup from "../popups/Popup";

const Navbar: React.FC = () => {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  return (
    <div className="flex justify-between site-container py-4">
      <div>
        <Link href="/" className="font-semibold text-purple-600">
          BandMate
        </Link>
      </div>
      <div>
        <div className="flex">
          <div
            className="mr-2 cursor-pointer"
            onClick={() => setLoginPopup(true)}
          >
            Log in
          </div>
          <Link href="/join" className="font-semibold">
            Register
          </Link>
        </div>
      </div>
      <Popup trigger={loginPopup}>
        <div className="bg-white p-4 w-96 shadow rounded">
          <div className="flex justify-end ">
            <div className="icon-button" onClick={() => setLoginPopup(false)}>
              <IoCloseOutline size={24} />
            </div>
          </div>
          <Login close={() => setLoginPopup(false)} />
        </div>
      </Popup>
    </div>
  );
};

export default Navbar;
