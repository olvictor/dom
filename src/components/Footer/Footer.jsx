import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div id="contato" className='bg-[#000000] bg-[radial-gradient(#ffffff33_.15px,#0A0A0A_1px)] bg-[size:20px_20px] text-white text-center py-6'>
        <h2 className='font-Monoton text-4xl'>Dom Valdenon</h2>
        <div className='flex justify-center mt-6 gap-4'>
          <IoLogoInstagram  size={50}/>
          <FaFacebook size={50} />
          <FaWhatsapp size={50} />
          <FaYoutube size={50} />
        </div>
        <div className='text-xl mt-4 font-bold'>
          <p>+ (21) 999999999</p>
          <p>+ email@email.com</p>
        </div>
    </div>
  )
}

export default Footer