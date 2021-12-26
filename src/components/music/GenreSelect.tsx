import React from "react";
import { useAppSelector } from "../../store/hooks";
import SelectiveButton from "../button/SelectiveButton";

interface Props {
  selectedGenres: string[];
  setSelectedGenres: Function;
}

const GenreSelect: React.FC<Props> = ({
  selectedGenres,
  setSelectedGenres,
}) => {
  const music = useAppSelector((state) => state.music);
  const toogleGenreSelection = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((el) => el !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div>
      {music.loading || music.error || !music.data ? (
        <div>Loading</div>
      ) : (
        <div className="my-2 flex flex-wrap">
          {music.data!.genres.map((genre) => {
            return (
              <SelectiveButton
                label={genre.name}
                key={genre.id}
                selected={selectedGenres.includes(genre.name)}
                toogle={toogleGenreSelection}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenreSelect;
