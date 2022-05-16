import "../style/signin.css";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import api from "../api/api";
import { validateLogin } from "./validate/validator";

import Auth from "../_helper/Auth";
import Footer from "../components/Footer";
const Signin = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = validateLogin({
      email: user,
    });

    if (error) {
      const er = error.details[0].message.slice(1, -1);
      setErrMsg(er.slice(0, er.indexOf('"')));
      return;
    }

    try {
      const response = await api.post("/login", { email: user, password: pwd });

      const accessToken = response?.data?.token;
      window.localStorage.setItem("auth-token", accessToken);
      setSuccess(true);
      Auth.login(accessToken);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Check Email and Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Navigate replace to="/">
          {window.location.replace("/")}
        </Navigate>
      ) : (
        <section className="form-login-container">
          <h1 className="header">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="username"
                className="login-input"
                placeholder=" example@example.com"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="login-input"
                placeholder=" Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>
            <button className="login-btn">Sign In</button>
          </form>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <p className="singup-label">
            Need an Account?
            <span className="line">
              {/*put router link here*/}
              <a href="/register"> Sign Up</a>
            </span>
          </p>
        </section>
      )}
      <div id="pic">
        <img
              src={require("../images/signinStyle.png")}
              alt="logo" 
              width="800px" height="707px"
              />
      </div>
    <Footer/>
    </>
  );
};

export default Signin;
