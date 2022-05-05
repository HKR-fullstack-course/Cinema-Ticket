import { decodeToken } from "./decodeToken";

class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.isUser = false;
    this.isAdmin = false;

    this.token = localStorage.getItem("auth-token");

    if (this.token && decodeToken(this.token).role.name === "admin") {
      console.log(decodeToken(this.token).role.name);
      this.isAuthenticated = true;
      this.isAdmin = true;
    } else if (this.token && decodeToken(this.token).role.name === "user") {
      this.isAuthenticated = true;
      this.isUser = true;
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }

  isAuthenticated() {
    return this.isAuthenticated;
  }

  isUser() {
    return this.isUser;
  }

  isAdmin() {
    return this.isAdmin;
  }
}

export default new Auth();
