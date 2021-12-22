import React from "react";

interface Props {
  trigger?: boolean;
}

const Popup: React.FC<Props> = ({ trigger, children }) => {
  return trigger ? <div className="popup">{children}</div> : <></>;
};

export default Popup;
