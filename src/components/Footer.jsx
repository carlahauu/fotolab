import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <div className='footerContainer'>
        <div className="footerItems">
            <a>privacy</a>
            <a>terms</a>
            <a>contact</a>
        </div>
        <p>made with love by <a>carla hau</a></p>
    </div>
  )
}

export default Footer