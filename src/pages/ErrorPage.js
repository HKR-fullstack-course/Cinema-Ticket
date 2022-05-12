import React from "react";
import erro_style from "../style/error.css";

const ErrorPage = () => {
  return (
    <>
    <img
            src={require("../images/error.png")}
            alt="logo" id="error"
            />
    <h1 id="texte"> Something went wrong... <a href="/"> Click To Return </a></h1>
    </>
  );
};

export default ErrorPage;
