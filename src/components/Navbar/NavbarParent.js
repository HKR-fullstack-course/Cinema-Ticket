import React from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

import Auth from "../../_helper/Auth";
import Navbar from "./NavbarGuest";
import NavbarUser from "./NavbarUser";
import NavbarAdmin from "./NavbarAdmin";

class NavbarParent extends React.Component {
  state = {
    isAuthenticated: false,
    isAdmin: false,
    isUser: false,
    token: "",
  };

  componentDidMount = () => {
    this.setState({
      isAuthenticated: Auth.isAuthenticated,
      isAdmin: Auth.isAdmin,
      isUser: Auth.isUser,
    });
  };

  logout = () => {
    window.localStorage.removeItem("auth-token");
    window.location.reload();
    Auth.logout();
  };

  renderChildNavbar() {
    if (Auth.isAuthenticated && Auth.isUser) {
      return <>{<NavbarUser layout={"Log Out"} logout={this.logout} />}</>;
    } else if (Auth.isAuthenticated && Auth.isAdmin) {
      return <>{<NavbarAdmin layout="Log Out" logout={this.logout} />}</>;
    }
    return <> {<Navbar layout="Sing In" />}</>;
  }

  render() {
    return <>{this.renderChildNavbar()}</>;
  }
}

export default NavbarParent;
