import React from "react";
import "./Display.css";

function Display(props) {
  return (
    <div className="display">
      <div>{props.display}</div>
      <br />
      <div>{props.result}</div>
    </div>
  );
}

export default Display;
