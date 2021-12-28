import React, { useState } from "react";
import { Link } from "wouter";
import Login from "../../components/auth/Login";
import Popup from "../../components/popups/Popup";
import { IoCloseOutline } from "react-icons/io5";

const Welcome: React.FC = () => {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  return (
    <div className="site-container flex flex-col items-center sm:block">
      <header className="my-16 xl:my-32 text-center sm:text-left">
        <span className=" text-2xl sm:text-4xl md:text-6xl font-semibold">
          Welcome to BandMate
        </span>
        <br />
        <span className="text-sm sm:text-base md:text-xl">
          the ultimate platform to meet fellow musicians
        </span>
      </header>
      <main className="flex flex-col md:flex-row  md:items-center">
        <Link href="/join">
          <div className="purple-button sm:w-72 w-full">Join</div>
        </Link>
        <div className="text-center sm:text-left my-4 md:my-0">
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
