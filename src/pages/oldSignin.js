
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