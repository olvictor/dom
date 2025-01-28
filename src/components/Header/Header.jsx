import React, { useState } from 'react'
import { motion } from "motion/react"
const Header = () => {
    const [ativo,setAivo] = useState(false);

    const handleClick = () =>setAivo(!ativo)

    const handleScrollToSection = (e,path) => {
        console.log(e)
        e.preventDefault()
        const section = document.getElementById(path);
        console.log(section)
        section.scrollIntoView({ behavior: "smooth" });
    };
    

  return (
    <div className="w-full h-16 p-4 relative">
        <button  onClick={handleClick} className="flex z-40 flex-col fixed z-10 items-left p-2 justify-center gap-1 w-14 h-14 rounded-2xl bg-[#c25cd8] text-white focus:outline-none">
            <span className="block w-8 h-1 bg-[#f8b500] rounded-2xl mb-1 rounded transition-transform"></span>
            <span className="block w-6 h-1 bg-[#f8b500] rounded-2xl mb-1 rounded transition-transform"></span>
            <span className="block w-8 h-1 bg-[#f8b500] rounded-2xl transition-transform"></span>
        </button>

        {ativo && <motion.div  initial={{ height: 0, width:0, opacity: 0 }}
            animate={{ height: "auto",width: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className= {`absolute top-4 left-4  md:top-5 md:left-16 z-30 md:bg-transparent w-auto md:w-screen z-0 ${ativo ? "" : " hidden"}`}>
            <ul className={`flex flex-col md:flex-row fixed bg-black rounded-lg flex-wrap md:bg-transparent rounded-4xl p-2 text-white font-bold`}>
                <li onClick={(e)=> handleScrollToSection(e,"capa")}><a href="#" className="mt-16 md:mt-0 block px-4 py-2 md:hover:text-[#f8b500] ">CAPA</a></li>
                <li onClick={(e)=> handleScrollToSection(e,"lancamento")}><a href="#" className="block px-4 py-2 md:hover:text-[#f8b500]">LANÇAMENTOS</a></li>
                <li><a href="#" className="block px-4 py-2 md:hover:text-[#f8b500]">DISCOGRAFIA</a></li>
                <li onClick={(e)=> handleScrollToSection(e,"agenda")}><a href="#" className="block px-4 py-2 md:hover:text-[#f8b500]">AGENDA</a></li>
                <li><a href="#" className="block px-4 py-2 md:hover:text-[#f8b500]">CARREIRA</a></li>
                <li onClick={(e)=> handleScrollToSection(e,"contato")}><a href="#" className="block px-4 py-2 md:hover:text-[#f8b500]">CONTATO</a></li>
            </ul>
        </motion.div>}
    </div>
  )
}

export default Header