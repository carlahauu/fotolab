import React from 'react'
import '../styles/Landing.css'

function Landing() {
  return (
    <div className='landingContainer'>
        <div className="hero">
            <div className="heroImg">
                <img src='/Hero Image.svg'></img>
            </div>
            <div className="heroRight">
                <h1>Bring the photo booth experience straight to your device!</h1>
                <p>An online photo booth that lets you capture and download your own photo strips in seconds!</p>
                <a href='/photobooth'><button>Try for free!</button></a>
            </div>
        </div>
        <div className="steps">
            <h1>Create photo strips in 3 easy steps.</h1>
            <div className="stepImages">
                <img src='/Step 1.svg'></img>
                <img src='/Step 2.svg'></img>
                <img src='/Step 3.svg'></img>
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