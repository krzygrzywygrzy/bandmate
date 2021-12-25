import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const FillProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const music = useAppSelector((state) => state.music);
  useEffect(() => {}, []);

  const [description, setDescription] = useState<string>("");

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
      <section className="w-full sm:w-96 header">
        <p className="text-sm sm:text-xl">First tell us some about yourself</p>
        <textarea
          className="textarea my-2"
          placeholder="Your description"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </section>
      <section className="w-full sm:w-96 header">
        <p className="text-sm sm:text-xl">
          Now provide some information about your skills and interests
        </p>
      </section>
    </div>
  );
};

export default FillProfile;
