import "../style/signin.css";
import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import api from "../api/api";

// class Signin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//     };

//         // const userRef = useRef();
//         // const errRef = useRef();

//         // const [user, setUser] = useState('');
//         // const [password, setPsw] = useState('');
//         // const [errMsg, setErrMsg] = useState('');
//         // const [success, setSeccess] = useState('');

//   }

//   // useEffect(() => {
//   //   console.log("useEffect has been called!", button);
//   // });

//   submitLogin = async (e) => {
//     e.preventDefault();
//     console.log(this.state.username);
//     console.log(this.state.password);

//     const response = await api.post(
//       "/login",
//       {
//         email: this.state.username,
//         password: this.state.password,
//       }
//       // JSON.stringify({
//       //   email: this.state.username,
//       //   password: this.state.password,
//       // }),
//       // {
//       //   headers: { "Content-Type": "application/json" },
//       //   withCredentials: true,
//       // }
//     );

//     console.log(JSON.stringify(response));
//   };

//   render() {
//     return (
//       <div className="form-login-container">
//         <div className="header">Login</div>
//         <div className="box">
//           <div className="input-group">
//             <label className="input-label" htmlFor="username">
//               Email
//             </label>
//             <input
//               type="text"
//               name="username"
//               className="login-input"
//               placeholder=" example@example.com"
//               autoComplete="off"
//               value={this.state.username}
//               onChange={(e) => this.setState({ username: e.target.value })}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               className="login-input"
//               placeholder=" Password"
//               value={this.state.password}
//               onChange={(e) => this.setState({ password: e.target.value })}
//               required
//             />
//           </div>

//           <p>
//             <label className="singup-label">Need An Account? </label>
//             <a href="#">Sing Up</a>
//           </p>

//           <button
//             type="button"
//             className="login-btn"
//             onClick={this.submitLogin.bind(this)}
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

import axios from "../api/api";
const LOGIN_URL = "/auth";

const Signin = () => {
  const { setAuth } = useContext(AuthContext);
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

    try {
      const response = await api.post(
        "/login",
        { email: user, password: pwd }

        // JSON.stringify({ email: user, password: pwd }),
        // {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true
        // }
      );
      console.log(response);
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      console.log(accessToken);
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
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
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
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
              <a href="#"> Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Signin;
