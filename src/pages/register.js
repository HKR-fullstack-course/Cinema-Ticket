import "../style/register.css";

import React from "react";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import { validateRegister } from "./validate/validator";
import api from "../api/api";
import axios from "axios";

const Register = () => {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [image, setImage] = useState("");
  const [user_id, setUserID] = useState("");

  const updateImageInDB = async (url) => {
    console.log("url : ", url);
    console.log("id > ", user_id);
    if (url) {
      try {
        await api.put("/update_user", {
          _id: "627963a230ab0100309773ff",
          image: url,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const updateUserAvatar = async () => {
  //   // const userAvatarUrl = image ? user_id : "default";
  //   // setURL(
  //   //   `https://res.cloudinary.com/` +
  //   //     process.env.REACT_APP_CLOUD_NAME +
  //   //     `/image/avatar/` +
  //   //     userAvatarUrl
  //   // );

  //   const id = image && user_id ? user_id : "default";
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", image);
  //     formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
  //     formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
  //     formData.append("public_id", user_id || "defaul");

  //     // REACT_APP_CLOUD_NAME-var does not effect the security that much!
  //     // the url of the image still includes the name of the cloud!
  //     const x = await fetch(
  //       `https://api.cloudinary.com/v1_1/` +
  //         process.env.REACT_APP_CLOUD_NAME +
  //         `/image/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     console.log("x ", x);
  //     console.log("uer ", url);
  //   } catch (error) {}
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { error } = validateRegister({
    //   name,
    //   email,
    //   pwd,
    //   confPwd,
    //   phone,
    //   birthdate,
    // });
    // if (error) {
    //   const er = error.details[0].message.slice(1, -1);
    //   setErrMsg(er.slice(0, er.indexOf('"')));
    //   return;
    // }

    try {
      await api
        .post("/create_user", {
          name: name,
          email: email,
          password: pwd,
          repeat_password: confPwd,
          phonenumber: phone,
          birthdate: birthdate,
          image_url:
            `https://res.cloudinary.com/` +
            process.env.REACT_APP_CLOUD_NAME +
            `/image/avatar/default`,
        })

        .then(async (res) => {
          setUserID(res.data.user_id);
          let reqImg;
          if (image) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
            formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
            formData.append("public_id", res.data.user_id);

            reqImg = await fetch(
              `https://api.cloudinary.com/v1_1/` +
                process.env.REACT_APP_CLOUD_NAME +
                `/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            // console.log(x.value);
            // console.log(x.json());
          }
          // console.log("id > " ,user_id);
          return reqImg.json();
        })
        .then(async (value) => {
          // console.log(value.secure_url);
          // updateImageInDB(value.secure_url);

          await api.put("/update_user", {
            _id: user_id,
            image_url: value.secure_url,
          });
        });

      // .then(data => {
      //   console.log(data);
      //   console.log(data.json());
      // })
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
        <Navigate replace to="/signin"></Navigate>
      ) : (
        <section className="form-register-container">
          <h1 className="head-register">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="register-group">
              <label className="register-label" htmlFor="name">
                Your Name* :
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
                Email* :
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
                Phone Number* :
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
                Password* :
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
                Confirm Password* :
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
                Birthdate* :{" "}
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
                name="file"
                type="file"
                className="register-input register-date"
                onChange={(e) => setImage(e.target.files[0])}
                multiple={false}
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
