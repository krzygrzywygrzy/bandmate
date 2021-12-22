import React, { useState } from "react";
import { Link } from "wouter";
import Popup from "../../components/popups/Popup";

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
        <Link href="/register">
          <div className="purple-button">Join</div>
        </Link>
        <div>
          or{" "}
          <span className="welcome-login" onClick={() => setLoginPopup(true)}>
            Log in
          </span>
        </div>
      </main>
      <Popup trigger={loginPopup}></Popup>
    </div>
  );
};

export default Welcome;
