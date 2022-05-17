import "../style/register.css";

import React from "react";
import { Navigate } from "react-router-dom";

import { validateRegister } from "./validate/validator";
import api from "../api/api";
import { postImage } from "../api/postImage";
import Footer from "../components/Footer";

class Register extends React.Component {
  state = {
    success: false,
    _id: "",
    name: "",
    email: "",
    pwd: "",
    confPwd: "",
    phone: "",
    birthdate: "",
    image_url: "",
    image: "",
    errMsg: "",
  };

  updateImageInDB = async (url) => {
    if (url) {
      try {
        await api.put("/update_user", {
          _id: this.state._id,
          image: url,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  postUser = async (body) => {
    const res = await api.post("/create_user", body);
    return res;
  };

  updateUserAvatar = async (id, url) => {
    const res = await api.put("/update_user", {
      user_id: id,
      password: this.state.pwd,
      image_url: url,
    });
    return res;
  };

  onImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = validateRegister({
      name: this.state.name,
      email: this.state.email,
      pwd: this.state.pwd,
      confPwd: this.state.confPwd,
      phone: this.state.phone,
      birthdate: this.state.birthdate,
    });

    if (error) {
      const er = error.details[0].message.slice(1, -1);
      this.setState({ errMsg: er.slice(0, er.indexOf('"')) });
      return;
    }

    try {
      const body = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.pwd,
        phonenumber: this.state.phone,
        birthdate: this.state.birthdate,
        image_url:
          `https://res.cloudinary.com/` +
          process.env.REACT_APP_CLOUD_NAME +
          `/image/upload/v1652046733/image/avatar/default`,
      };

      const resp = await this.postUser(body);
      if (this.state.image) {
        const response = await postImage(resp.data.user_id, this.state.image);
        console.log(response);
        const res = await this.updateUserAvatar(
          resp.data.user_id,
          response.secure_url
        );
      }

      this.setState({ success: resp.status === 200 ? true : false });
    } catch (err) {
      if (!err?.response) {
        this.setState({ errMsg: "No Server Response" });
      } else if (err.response?.status === 400) {
        this.setState({ errMsg:"Email exists!" });
      } else if (err.response?.status === 401) {
        this.setState({ errMsg: "No Server Response" });
      } else {
        this.setState({ errMsg: "Registration Failed" });
      }
    }
  };

  render = () => {
    return (
      <>
        {this.state.success ? (
          <Navigate replace to="/signin"></Navigate>
        ) : (
          <section className="form-register-container">
            <h1 className="head-register">Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="register-group">
                <label className="register-label" htmlFor="name">
                  Your Name* :
                </label>
                <input
                  type="text"
                  className="register-input"
                  placeholder=" Your Name"
                  autoComplete="off"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
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
                  onChange={(e) => this.setState({ email: e.target.value })}
                  value={this.state.email}
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
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  value={this.state.phone}
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
                  onChange={(e) => this.setState({ pwd: e.target.value })}
                  value={this.state.pwd}
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
                  onChange={(e) => this.setState({ confPwd: e.target.value })}
                  value={this.state.confPwd}
                />
              </div>
              <div className="register-group">
                <label className="register-label" htmlFor="password">
                  Birthdate* :
                </label>
                <input
                  type="date"
                  className="register-input register-date"
                  onChange={(e) => this.setState({ birthdate: e.target.value })}
                  value={this.state.birthdate}
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
                  onChange={this.onImageChange}
                  multiple={false}
                />
              </div>
              <button className="login-btn">Register</button>
            </form>
            <p
              className={this.state.errMsg.length ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {this.state.errMsg}
            </p>
            <p className="singup-label">
              Have an Account?
              <span className="line">
                <a href="/signin"> Sign In</a>
              </span>
            </p>
          </section>
        )}
        <div id="spider">
          <img
            src={require("../images/spider.png")}
            alt="logo"
            width="400px"
            height="707px"
          />
        </div>
        <Footer />
      </>
    );
  };
}

export default Register;
