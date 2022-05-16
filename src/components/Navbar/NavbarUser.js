import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import Auth from "../../_helper/Auth";
import Sidebar from "../Sidebar/SidebarUser";

const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
     <Sidebar isOpen={isOpen} toggle={toggle} />
      <Nav>
        <NavLink to="/">
          <img
            src={require("../../images/logo.png")}
            alt="logo"
            width="350px" 
            height="70px"
          />
        </NavLink>
        <Bars onClick={toggle}>
          <FaBars />
        </Bars>
        <NavMenu>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/tickets">My Tickets</NavLink>
          {/* <NavLink to="/services">Buy Ticket</NavLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink
            replace
            to="/"
            onClick={() => {
              Auth.logout();
              window.localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Log Out
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavbarUser;
