import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import dom from '../../assets/dom.jpg'
import dom2 from '../../assets/dom2.jpg'
import dom3 from '../../assets/dom3.jpg'
import dom4 from '../../assets/dom4.jpg'


const CapaMain = () => {

const arrayImages = [dom,dom2,dom3,dom4]

const [value,setValue] = useState(0)
const [isActive, setIsActive] = useState(true);

const divStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${arrayImages[value]})`, 
  backgroundSize: "100% 100%", 
  backgroundPosition: "center",  
  backgroundRepeat: "no-repeat"
};

useEffect(() => {
  const interval = setInterval(() => {
    setIsActive(false);
    setTimeout(() => {
      if (value < arrayImages.length - 1) {
        setValue((prev) => prev + 1);
      } else {
        setValue(0);
      }
      setIsActive(true); 
    }, 500); 
  }, 4000); 

  return () => clearInterval(interval);
}, [value, arrayImages.length]);
  return (
    <div
      id='capa'
      className={`w-full relative fade-effect ${isActive ? 'active' : ''}`}
      style={divStyle}
      shadow-lg
    >
      <Header />
    </div>
  )
}

export default CapaMain