import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import { FaBars } from 'react-icons/fa';
const Navbar = ({toggle}) => {
  
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../../images/logo.png')} alt='logo' width="350px" height="70px"  />
        </NavLink>
        <Bars onClick={toggle}>
          <FaBars/>
        </Bars>
        <NavMenu>
        <NavLink to='/movies'>
            Movies
          </NavLink>
          <NavLink to='/about'>
            About
          </NavLink>
          <NavLink to='/services'>
            Services
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
