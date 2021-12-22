import React from "react";

const Welcome: React.FC = () => {
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
        <div className="purple-button">Join</div>
        <div>
          or <span className="welcome-login">Log in</span>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
