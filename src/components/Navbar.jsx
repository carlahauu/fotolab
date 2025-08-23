import React, {useState} from 'react'
import '../styles/Navbar.css'
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const [mobileNav, setMobileNav] = useState(false)
  const onHamburgerClick = () => {
    if (!mobileNav) {
      setMobileNav(true)
    }
    else {
      setMobileNav(false)
    }
  }
  return (
    <div className='navbarContainer'>
        <div className="logo">
            <a href='/'><h1>fotolab</h1></a>
        </div>
        <div className="navItems">
            <a href='/photobooth'>photo booth</a>
            <a href='/contact'>contact</a>
        </div>
        <div className="mobileNav">
          <GiHamburgerMenu onClick={onHamburgerClick} className='hamburger' />
          {mobileNav && 
            <div className="mobileNavItems">
                <a href='/photobooth'>photo booth</a>
                <a href='/contact'>contact</a>
            </div>
          }
        </div>
    </div>
  )
}

export default Navbar