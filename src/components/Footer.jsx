import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <div className='footerContainer'>
        <div className="footerItems">
            <a href='/privacy'>privacy</a>
            <a href='/terms'>terms</a>
            <a>contact</a>
        </div>
        <p>made with love by <a>carla hau</a></p>
    </div>
  )
}

export default Footer