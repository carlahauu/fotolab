import { useState } from 'react'
import React from 'react'
import '../styles/PrivacyBanner.css'
import { IoClose } from 'react-icons/io5'

function PrivacyBanner() {
    const [closeBanner, setCloseBanner] = useState(false)
    const [bannerStyle, setBannerStyle] = useState("flex")

    const handleCloseBanner = () => {
        if (closeBanner){
            setCloseBanner(true)
            setBannerStyle("flex")
        }
        else{
            setCloseBanner(false)
            setBannerStyle("none")
        }
    }

  return (
    <div style={{display: bannerStyle}} className='privacyBannerContainer'>
        <p>
            We've updated our <a href='/privacy'>Privacy Policy!</a>
        </p>
        {/* <button onClick={handleCloseBanner}><IoClose /></button> */}
    </div>
  )
}

export default PrivacyBanner