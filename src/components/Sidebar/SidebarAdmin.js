import React from 'react'
import { SidebarCountainer,Icon,CloseIcon,SidebarMenu,SidebarWrapper,SidebarLink,SideBtnWrap,SidebarRoute} from './SidebarElements'
import Auth from "../../_helper/Auth";
const Sidebar = ({isOpen,toggle}) => {
  return (
    <SidebarCountainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to='/movies' >Movies</SidebarLink>
                <SidebarLink to='/add_movie'>Add Movie</SidebarLink>
                <SidebarLink to='/about'>About</SidebarLink>
                <SidebarLink to='/users'>Users</SidebarLink>
                <SidebarLink to='/all_movies'>Table Of Movies</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute  replace
                    to="/"
                    onClick={() => {
                    Auth.logout();
                    window.localStorage.removeItem("auth-token");
                    window.location.replace('/');
                    }}>Log Out
                </SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
      
    </SidebarCountainer>
  )
}

export default Sidebar