import React from 'react'
import dom from '../../assets/dom4.jpg'

const Agenda = () => {
  const shows = [
    {
        data:"29 nov",
        estado: "Rio de Janeiro/RJ",
        localidade:"Ribeira - Ilha do governador",
        hora: "20"
    },
    {
        data:"15 dez",
        estado: "Rio de Janeiro/RJ",
        localidade:"Ribeira - Ilha do governador",
        hora: "20"
    },
    {
        data:"29 dez",
        estado: "Rio de Janeiro/RJ",
        localidade:"Ribeira - Ilha do governador",
        hora: "20"
    },
  ]
  const divStyle = {
    width: "100%",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${dom})`, 
    backgroundSize: "cover",      
    backgroundPosition: "center",  
    backgroundRepeat: "no-repeat",
  };
  

  return (
    <div className={`fadeOnRenderDiv bg-rosa h-screen flex flex-col text-center justify-center bg-[url('${dom}')]`} style={divStyle} >
         <h2 className='font-gloria text-6xl font-bold text-white mb-10  opacity-100'>PRÓXIMOS SHOWS</h2>

         <div className='flex gap-6 flex-wrap w-full fadeOnRenderDiv'>
            {shows.map((s)=>{
               return <div className='flex justify-center text-white w-1/2 h-[130px] rounded-xl text-center shadow'>
                    <div className='flex text-center justify-center items-center  border-r border-white '>
                        <p className='text-4xl'>{s.data}</p>
                    </div>
                    <div className='flex flex-col h-full items-center justify-center text-center p-2'>
                        <p>{s.estado}</p>
                        <p>{s.localidade}</p>
                        <p className='text-2xl'> {s.hora}H</p>
                    </div>
                </div>
            })}
         </div>
    </div>
  )
}

export default Agenda