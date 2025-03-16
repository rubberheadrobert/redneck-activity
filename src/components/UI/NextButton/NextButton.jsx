import React from "react";
import "./NextButton.css";
import { Link } from "react-router-dom";
export default function NextButton(props) {
  return (
    <Link to={props.to} id="next-button">
      {props.children}
    </Link>
  );
}
