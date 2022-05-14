import { decodeToken } from "./decodeToken";

class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.isUser = false;
    this.isAdmin = false;
    this._id = "";

    this.token = localStorage.getItem("auth-token");

    if (this.token && decodeToken(this.token).role === "admin") {
      this.isAuthenticated = true;
      this.isAdmin = true;
      this._id = decodeToken(this.token)._id;
    } else if (this.token && decodeToken(this.token).role === "user") {
      this.isAuthenticated = true;
      this.isUser = true;
      this._id = decodeToken(this.token)._id;
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

  getID() {
    return this._id;
  }
}

export default new Auth();
