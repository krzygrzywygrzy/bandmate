import React from "react";
import { SelectiveButtonSkeleton } from "../button/SelectiveButton";

const MusicSkeleton: React.FC = () => {
  return (
    <div>
      <div className="flex">
        <SelectiveButtonSkeleton />
        <SelectiveButtonSkeleton />
        <SelectiveButtonSkeleton />
      </div>
      <div className="flex">
        <SelectiveButtonSkeleton />
        <SelectiveButtonSkeleton />
      </div>
    </div>
  );
};

export default MusicSkeleton;
