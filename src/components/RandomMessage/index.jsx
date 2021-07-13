import React from "react";
import "./index.scss";
const RandomMessage = ({ number = 1, Display }) => {
  return (
    <div className={Display ? "RandomMessage" : "DisplayNone"}>
      <h1>Vista random {number === "Home" ? 1 : 2} / 2</h1>
    </div>
  );
};
export default RandomMessage;
