import React, { useState } from "react";
import { Link } from "wouter";
import Login from "../../components/auth/Login";
import Popup from "../../components/popups/Popup";
import { IoCloseOutline } from "react-icons/io5";

const Welcome: React.FC = () => {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  return (
    <div className="site-container">
      <header className="my-16 xl:my-32">
        <span className="text-6xl font-semibold">Welcome to BandMate</span>
        <br />
        <span className="text-xl">
          the ultimate platform to meet fellow musicians
        </span>
      </header>
      <main className="flex items-center">
        <Link href="/join">
          <div className="purple-button">Join</div>
        </Link>
        <div>
          or{" "}
          <span className="welcome-login" onClick={() => setLoginPopup(true)}>
            Log in
          </span>
        </div>
      </main>
      <Popup trigger={loginPopup}>
        <div className="popup-content">
          <div className="flex justify-end ">
            <div className="icon-button" onClick={() => setLoginPopup(false)}>
              <IoCloseOutline size={24} />
            </div>
          </div>
          <Login />
        </div>
      </Popup>
    </div>
  );
};

export default Welcome;
