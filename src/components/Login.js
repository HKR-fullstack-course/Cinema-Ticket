import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <form>
            Email:
          <input type="text" />
          Password:
          <input type="password" />

        </form>

        <button>Login</button>
      </div>
    );
  }
}

export default Login;
