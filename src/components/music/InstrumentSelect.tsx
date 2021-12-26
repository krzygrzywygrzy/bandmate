import React from "react";
import { useAppSelector } from "../../store/hooks";

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
    <div>{title && <div className="text-base sm:text-xl">{title}</div>}</div>
  );
};

export default InstrumentSelect;
