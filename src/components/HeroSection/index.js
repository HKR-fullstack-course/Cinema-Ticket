import React from 'react'
import Video from '../../videos/video.mp4'
import { HeroContainer,HeroBg,VideoBg,HeroH2,HeroP,HeroContent } from './HeroElements'

const HeroSection = () => {
  return (
    <HeroContainer>
        <HeroBg>
            <VideoBg autoPlay loop muted >
                <source src={Video} type="video/mp4"/>
            </VideoBg>
        </HeroBg> 
        <HeroContent>
            <HeroH2>The new way to come across movies </HeroH2>
            <HeroP>Book a ticket for a movie in a very simple way
                in just a few minutes. Many story awaits you !
            </HeroP>
        </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
