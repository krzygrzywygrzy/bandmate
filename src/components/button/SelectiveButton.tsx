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
        selected ? "border-purple-600 shadow-lg" : "border-black shadow-none"
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

export const SelectiveButtonSkeleton: React.FC = () => {
  return <div className="selective-button-skeleton rounded"></div>;
};
