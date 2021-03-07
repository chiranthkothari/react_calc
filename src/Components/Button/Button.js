import React from "react";
import "./Button.css";

function Button(props) {
  //Function to add conditional styling to operator buttons
  const buttonStyle = (val) => {
    return val === "+" || val === "-" || val === "x" || val === "÷";
  };

  return (
    <div
      className={
        buttonStyle(props.children) ? "button button_operators" : "button"
      }
      onClick={() => props.onClick(props.children)}
    >
      {props.children}
    </div>
  );
}

export default Button;
