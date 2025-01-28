import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import dom from '../../assets/dom.jpg'
import dom2 from '../../assets/dom2.jpg'
import dom3 from '../../assets/dom3.jpg'
import dom4 from '../../assets/dom4.jpg'
import { MdHeight } from 'react-icons/md'


const CapaMain = () => {

const arrayImages = [dom,dom2,dom3,dom4]

let [value,setValue] = useState(0)
const divStyle = {
  width: "100%",
  height: "90vh",
  backgroundImage: `url(${arrayImages[value]})`, 
  backgroundSize: "cover",      
  backgroundPosition: "center",  
  backgroundRepeat: "no-repeat"
};

useEffect(() => {
    const interval = setInterval(() => {
      if(value < arrayImages.length -1){
        setValue(prev => prev + 1);
      }else{
        setValue(0)
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <div id='capa' className={`w-full relative bg-[url('${dom}')]`} style={divStyle} shadow-lg>
      <Header />
    </div>
  )
}

export default CapaMain