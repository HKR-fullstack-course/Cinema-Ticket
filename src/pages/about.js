import React from 'react';
import Footer from '../components/Footer';
import Style_About from'../style/about.css'
const About = () => {
  return (
    <>
          <img
                  src={require("../images/logo.png")}
                  alt="logo" 
                  id="logo"/>
          <h1 id="titleMobile" >The new way to come across movies </h1>
          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
          <center><p id="ptext">Discovery Cineam is a web application that help you discover new story in theater by simplifying the booking system. It helps customers booking a ticket for a movie in a very easy way and it also helps cinema owner. Customers can book a ticket for a movie in a few seconds by login or creating an acccount and picking a movie and a screening time for availables movies.
          The application provide extrem reliablity for cinema owner to manage their businesses without too much ressources. By having a clean interface and a direct access to user data and movie data, Administrator can add a new movie but also delete current films if their are not programmed anymore,
          they can also delete user from the database. All this through a very simple and clean interface that can fit many cinema structure.</p></center>
      <h1 id="titleReact" >Made with React </h1>
      <img
                  src={require("../images/react.gif")}
                  alt="logo" 
                  id="logoReact"
                  height="200px" width="200px"/>
      <br/> <br/> <br/> 
      <img
                  src={require("../images/mobile.png")}
                  alt="logo" 
                  className="center"  />
        <br/> <br/> <br/> <br/> <br/>
          <center><p id="ptext">The website was designed to work on any screen size available, wether we are talking about phone , tablet or pc monitor. We designed it to be responsive and display content propely regardless of wich device you are using. One of the key to make it work was to use the framework React js, it provided flexibility for the developement team 
          and many external library so we could re-used some components. Since it is a React web based application we can imagined a future where Discovery cinema can be optimized for tv-application or IOS and Android app without too much suplementary ressources.  </p></center>
          <br/> <br/> <br/><br/> <br/> <br/> 
      <h1 id="titleMobile" >All your Data secured </h1>
      
      <img
                  src={require("../images/lock.gif")}
                  alt="logo" 
                  id="logoReact"/>
      <br/> <br/> <br/> <br/> <br/>
      <center><p id="ptext">The integrety of the application is something we thought deeply about. The security of user data was our priority, from the login page to the movie page. We secured the application by usin tokens (JWT) for each user and all the data are stored using a Mango database (MangoDb). </p></center>
      <br/> <br/> <br/><br/> <br/> <br/> 
      <Footer/>
    </>
  );
};

export default About;
