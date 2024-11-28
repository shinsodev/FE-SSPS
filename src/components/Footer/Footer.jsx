// import React from 'react'
import Logo from "../../assets/img/logo.png"

const Footer = () => {
  return (
    <footer className="bg-slate-500 py-6">
      <div className="container mx-auto text-white flex items-center justify-between">
        {/* logo  */}
        <a href="/">
          <img src={Logo} alt="logo" className="w-20"/>
        </a>
        
        Copyright &copy; 2024. All rights reserved
      </div>

    </footer>
  )
}

export default Footer