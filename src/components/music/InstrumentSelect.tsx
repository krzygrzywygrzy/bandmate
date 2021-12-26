import React from "react";
import { useAppSelector } from "../../store/hooks";
import SelectiveButton from "../button/SelectiveButton";
import MusicSkeleton from "./MusicSkeleton";

interface Props {
  selectedInstruments: string[];
  setSelectedInstruments: Function;
  title?: string;
}

const InstrumentSelect: React.FC<Props> = ({
  selectedInstruments,
  setSelectedInstruments,
  title,
}) => {
  const music = useAppSelector((state) => state.music);
  const toogleInstrumentSelection = (instrument: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(
        selectedInstruments.filter((el) => el !== instrument)
      );
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  return (
    <div>
      {title && <div className="text-base sm:text-xl">{title}</div>}
      {music.loading || music.error || !music.data ? (
        <MusicSkeleton />
      ) : (
        <div className="my-2 flex flex-wrap">
          {music.data!.instruments.map((genre) => {
            return (
              <SelectiveButton
                label={genre.name}
                key={genre.id}
                selected={selectedInstruments.includes(genre.name)}
                toogle={toogleInstrumentSelection}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InstrumentSelect;
