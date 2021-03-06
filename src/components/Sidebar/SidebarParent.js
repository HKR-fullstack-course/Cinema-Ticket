import React from 'react'
import { SidebarCountainer,Icon,CloseIcon,SidebarMenu,SidebarWrapper,SidebarLink,SideBtnWrap,SidebarRoute} from './SidebarElements'
const SidebarParent = ({isOpen,toggle}) => {
  return (
    <SidebarCountainer isOpen={isOpen} onClick={toggle}>
        <Icon  onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to='/movie_list' >Movies</SidebarLink>
                <SidebarLink to='/services'>Services</SidebarLink>
                <SidebarLink to='/about'>About</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to='/signin'>Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
      
    </SidebarCountainer>
  )
}

export default SidebarParent



