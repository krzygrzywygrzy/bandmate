import React from "react";

const FillProfile: React.FC = () => {
  return (
    <div className="site-container">
      <header className="header">
        <span className="text-2xl sm:text-3xl md:text-4xl">
          Fill your profile
        </span>
        <br />
        <p className="text-sm sm:text-base">
          The registration process went successfuly so now it is time to fill
          rest of the gaps
        </p>
      </header>
    </div>
  );
};

export default FillProfile;
