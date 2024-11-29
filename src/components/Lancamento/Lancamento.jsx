import React, { useState } from 'react'
import NumeroAnimado from '../NumeroAnimado/NumeroAnimado'

const Lancamento = () => {
  const [translateX, setTranslateX] = useState(420); // Estado para o deslocamento
  const [startX, setStartX] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); // Armazena a posição inicial do toque
  };

  const handleTouchMove = (e) => {
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      console.log(deltaX)
    
      setTranslateX((prev) => prev + deltaX);
      setStartX(currentX); // Atualiza a posição inicial para o próximo movimento
    }
  };

  const handleTouchEnd = () => {
    setStartX(null); // Reseta a posição inicial ao terminar o toque
  };
  const videoLancamento = {
    titulo: "Dom Valdenon - Desodorante (Clipe Oficial)",
    url:"https://www.youtube.com/embed/7BnVqD7EN88?si=nGMSZrJYkuk33ljp",
    visualizacoes:"3455",
    lancamento:"18 de nov. de 2024"
  }
  const musicas = [{
    tumb:"https://img.youtube.com/vi/7BnVqD7EN88/hqdefault.jpg",
    url:"https://www.youtube.com/embed/7BnVqD7EN88?si=nGMSZrJYkuk33ljp",
    titulo:"Dom Valdenon - Desodorante (Clipe Oficial)"
  },
  {
    tumb:"https://img.youtube.com/vi/7BnVqD7EN88/hqdefault.jpg",
    url:"https://www.youtube.com/embed/7BnVqD7EN88?si=nGMSZrJYkuk33ljp",
    titulo:"Dom Valdenon - Desodorante (Clipe Oficial)"
  },
  {
    tumb:"https://img.youtube.com/vi/7BnVqD7EN88/hqdefault.jpg",
    url:"https://www.youtube.com/embed/7BnVqD7EN88?si=nGMSZrJYkuk33ljp",
    titulo:"Dom Valdenon - Desodorante (Clipe Oficial)"
  },
  {
    tumb:"https://img.youtube.com/vi/7BnVqD7EN88/hqdefault.jpg",
    url:"https://www.youtube.com/embed/7BnVqD7EN88?si=nGMSZrJYkuk33ljp",
    titulo:"Dom Valdenon - Desodorante (Clipe Oficial)"
  }
]
  return (
    <div className='flex-row justify-items-center text-left	w-[100%] bg-gradient-to-b from-purple-600 to-[#ff335e]' onClick={()=> setTranslateX(420)}>
        <h2 className='font-gloria text-6xl font-bold text-white mb-8 align-left'>Lançamentos</h2>
        <iframe width="90%" height="315" src={videoLancamento.url} title={videoLancamento.titulo} frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div className='flex-row text-center'>
          <h3 className='text-dourado text-2xl font-bold'>{videoLancamento.titulo}</h3>
          <p className='text-6xl font-bold text-dourado'><NumeroAnimado  n={+videoLancamento.visualizacoes}/></p>
          <span className='text-xl text-white'>Visualizações</span>
          <p className='text-white'>Lançamento: {videoLancamento.lancamento}</p>
          <p className='text-dourado text-xl'>+de <span className='font-bold'>450</span>  inscritos</p>
        </div>

        <h3 className='mt-6 text-4xl text-white font-bold'>Últimos lançamentos</h3>
        <div className='flex gap-6 mt-4 w-max'
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{
          transform: `translateX(${translateX}px)`,
        }}
        >
            {musicas.map((m,index)=>{
             return <div className='w-[300px] flex-row justify-center text-center' onClick={()=>console.log(index)}> 
                <img className='rounded-2xl' src={m.tumb} alt={m.titulo} />
                <p className='text-white font-bold'>{m.titulo}</p>
              </div>
            })}
        </div>
    </div>
  )
}

export default Lancamento