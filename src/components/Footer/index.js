import React from "react";
import {
  Box,
  Container
} from "./FooteraElements";
  
const Footer = () => {
  return (
    <Box>
     < Container>
        <img
            src={require("../../images/logo.png")}
            alt="logo"
            width="350px" height="70px" 
            />
        </Container>   
      <h1 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "-15px",
                   fontSize:"20px" }}>
        The new way to come across movies
      </h1>
      <h3 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "25px" }}>
        DiscoveryCinema Copyright© 2022
      </h3>
    </Box>
    
  );
};
export default Footer;