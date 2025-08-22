import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <div className='footerContainer'>
        <div className="footerItems">
            <a href='/privacy'>privacy</a>
            <a href='/terms'>terms</a>
            <a href='/contact'>contact</a>
        </div>
        <p>made with love by <a href='https://www.carlahau.com'>carla hau</a></p>
    </div>
  )
}

export default Footer