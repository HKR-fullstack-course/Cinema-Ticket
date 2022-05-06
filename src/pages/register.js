import "../style/register.css";

import React from "react";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import { validateRegister } from "./validate/validator";
import api from "../api/api";

const Register = () => {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [image, setImage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

    console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateRegister({
      name,
      email,
      pwd,
      confPwd,
      phone,
      birthdate,
    });
    if (error) {
      const er = error.details[0].message.slice(1, -1);
      setErrMsg(er.slice(0, er.indexOf('"')));
      return;
    }

    try {
        const response = await api.post("/create_user", {
          name: name,
          email: email,
          password: pwd,
          repeat_password: confPwd,
          phonenumber: phone,
          birthdate: birthdate,
        })
        
        
        // The following code is still broken due to CROS from
        // server side
        
        // .then( (response)=>{
            // const formData = new FormData();
            // formData.append("owner_id", '123132');
            // formData.append("file", image);
            // const resImg = await api.post('/image', formData)
        // })
        .then( (response) => {
            setSuccess(true);
            console.log(response);
        })

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Email exists!");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <Navigate replace to="/signin">
        </Navigate>
      ) : (
        <section className="form-register-container">
          <h1 className="head-register">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="register-group">
              <label className="register-label" htmlFor="name">
                Full Name:
              </label>
              <input
                type="text"
                className="register-input"
                placeholder=" Your Name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="register-group">
              <label className="register-label" htmlFor="email">
                Email:
              </label>
              <input
                type="text"
                className="register-input"
                placeholder=" example@example.com"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="register-group">
              <label className="register-label" htmlFor="phonenumber">
                Phone Number :
              </label>
              <input
                type="text"
                className="register-input"
                placeholder=" 070 000 0000"
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="register-group">
              <label className="register-label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="register-input"
                placeholder=" Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
            </div>
            <div className="register-group">
              <label className="register-label" htmlFor="password">
                Repeat Password:
              </label>
              <input
                type="password"
                className="register-input"
                placeholder=" Confirm Password"
                onChange={(e) => setConfPwd(e.target.value)}
                value={confPwd}
              />
            </div>
            <div className="register-group">
              <label className="register-label" htmlFor="password">
                Birthdate:{" "}
              </label>
              <input
                type="date"
                className="register-input register-date"
                onChange={(e) => setBirthdate(e.target.value)}
                value={birthdate}
              />
            </div>
            <div className="register-group">
              <label className="register-label" htmlFor="image">
                Profile Image:{" "}
              </label>
              <input
                name="image"
                type="file"
                className="register-input register-date"
                onChange={(e) => setImage(e.target.files[0])}
                // value={image}
              />
            </div>
            <button className="login-btn">Register</button>
          </form>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <p className="singup-label">
            Have an Account?
            <span className="line">
              <a href="/signin"> Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
