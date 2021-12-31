import React, { useState, useEffect } from "react";
import GenreSelect from "../../components/music/GenreSelect";
import InstrumentSelect from "../../components/music/InstrumentSelect";
import { thunkLoadMusicData } from "../../store/actions/musicActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spotify from "react-spotify-embed";
import { thunkWriteUser } from "../../store/actions/userActions";
import { supabase } from "../../supabaseClient";
import isValidUrl from "../../core/isValidUrl";
import { useLocation } from "wouter";

const FillProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(thunkLoadMusicData());
  }, [dispatch]);

  const [description, setDescription] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [spotifyLink, setSpotifyLink] = useState<string | undefined>();

  const handleSubmit = () => {
    dispatch(
      thunkWriteUser({
        user_id: supabase.auth.user()!.id,
        instruments: selectedInstruments,
        genres: selectedGenres,
        description,
        spotify: spotifyLink,
        name: supabase.auth.user()!.user_metadata.name,
        surname: supabase.auth.user()!.user_metadata.surname,
      })
    );
  };

  const [, setLocation] = useLocation();
  useEffect(() => {
    if (supabase.auth.user()!.user_metadata.filled) setLocation("/");
  });

  return (
    <div className="site-container">
      <header className="header">
        <span className="text-2xl sm:text-3xl md:text-4xl">
          Fill your profile
        </span>
        <br />
        <p className="text-xl sm:text-2xl">
          The registration process went successfuly so now it is time to fill
          rest of the gaps
        </p>
      </header>
      <section className="w-full sm:w-96 header">
        <p className="text-base sm:text-2xl">
          First tell us some about yourself
        </p>
        <textarea
          className="textarea my-4"
          placeholder="Your description"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </section>
      <section className="w-full sm:w-96 header">
        <p className="text-base sm:text-2xl border-b pb-4 mb-4">
          Now provide some information about your skills and interests
        </p>
        <GenreSelect
          selectedGenres={selectedGenres}
          setSelectedGenres={(g: string[]) => setSelectedGenres(g)}
          title="Select genres you love"
        />
        <div className="border-b my-4"></div>
        <InstrumentSelect
          selectedInstruments={selectedInstruments}
          setSelectedInstruments={(i: string[]) => setSelectedInstruments(i)}
          title="Select instruments you play"
        />
        <div className="border-b my-4"></div>
        <section className="mb-8">
          <div className="text-base sm:text-xl">
            You can share Spotify link to your favourite song or album
          </div>
          <input
            type="text"
            placeholder="Spotify link...."
            className="register-text-input my-2"
            value={spotifyLink ?? ""}
            onChange={(e) => setSpotifyLink(e.target.value)}
          />
          {spotifyLink && isValidUrl(spotifyLink) && (
            <Spotify
              link={spotifyLink}
              className="w-full  sm:mx-0 sm:w-96 my-2"
            />
          )}
        </section>
        {user.error && (
          <div className="my-2 text-purple-600">{user.error.message}</div>
        )}
        <button className="purple-button w-full sm:w-96" onClick={handleSubmit}>
          {user.loading ? "Loading..." : "Save"}
        </button>
      </section>
    </div>
  );
};

export default FillProfile;
