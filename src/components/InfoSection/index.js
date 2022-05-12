import React from 'react'
import Info_style from "../../style/Info.css" 


const InfoSection = () => {
  return (
    <>
      <div className="InfoContainer">
        <h1 className="Title"><u>How to use Discovery ?</u></h1>
        <div className="InfoWrapper"><img src={require('../../images/1.png')} className="ImageWrapper2" width="500" height="450" alt="step1"/><p>1.<br/>Create an account / Login in</p> </div>
        <div className="InfoWrapper"><img src={require('../../images/2.png')} className="ImageWrapper" width="450" height="400" alt="step2"/><p>2.<br/>Choose a movie and book a ticket</p> </div>
        <div className="InfoWrapper"><img src={require('../../images/3.png')} className="ImageWrapper2" width="450" height="450" alt="step3"/><p>3.<br/>Enjoy your movie in cinema</p></div>
        {/* <button className="button">Start Now</button> */}
      </div>
    </>
  )
}

export default InfoSection
