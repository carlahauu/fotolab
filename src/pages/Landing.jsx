import React from 'react'
import '../styles/Landing.css'

function Landing() {
  return (
    <div className='landingContainer'>
        <div className="hero">
            <h1>Bring the photo booth experience straight to your device!</h1>
            <p>An online photo booth that lets you capture and download your own photo strips in seconds!</p>
            <a href='/photobooth'><button>Try for free!</button></a>
        </div>
        <div className="steps">
            <h1>Create photo strips in 3 easy steps.</h1>
            <div className="step">
                <h3>01</h3>
                <p>Select a frame for your photo strip!</p>
            </div>
            <div className="step">
                <h3>02</h3>
                <p>Take 8 shots, then choose 4 to create your perfect photo strip.</p>
            </div>
            <div className="step">
                <h3>03</h3>
                <p>Download your photo strip! Share it with friends! </p>
            </div>
        </div>
        <div className="cta">
            <h1>So what are you waiting for?</h1>
            <a href='/photobooth'><button>Try for free!</button></a>
        </div>
    </div>
  )
}

export default Landing