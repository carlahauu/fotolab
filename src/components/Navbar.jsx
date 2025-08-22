import React from 'react'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className='navbarContainer'>
        <div className="logo">
            <h1>fotolab</h1>
        </div>
        <div className="navItems">
            <a>photo booth</a>
            <a>about</a>
            <a>contact</a>
        </div>
    </div>
  )
}

export default Navbar