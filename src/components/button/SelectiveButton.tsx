import React from "react";

interface Props {
  label: string;
  selected?: boolean;
  toogle?: Function;
}

const SelectiveButton: React.FC<Props> = ({ label, selected, toogle }) => {
  return (
    <button
      className={`selective-button  ${
        selected ? "border-purple-500 shadow-lg" : "border-black"
      }`}
      onClick={() => {
        if (toogle) toogle(label);
      }}
    >
      {label}
    </button>
  );
};

export default SelectiveButton;
