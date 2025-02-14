import React, { useEffect, useState } from 'react'
import NumeroAnimado from '../NumeroAnimado/NumeroAnimado'
import { motion } from "framer-motion";

const Lancamento = () => {
  const [translateX, setTranslateX] = useState(420); 
  const [startX, setStartX] = useState(null);
  const [isDraging,setIsDragging] = useState(false)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX); 
  };
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = "UCsqWor944vkdqX_fSo2lcxQ"

  const handleTouchMove = (e) => {
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;

      
      const screenWidth = window.innerWidth;
      const componenteWidth = document.getElementById("container").offsetWidth; 
      const maxTranslateX = 2500; 
      const minTranslateX = screenWidth - componenteWidth; 
      setTranslateX((prev) => {
        const newTranslateX = prev + deltaX;

        return Math.min(Math.max(newTranslateX, minTranslateX), maxTranslateX);
      });
      
      setStartX(currentX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
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
const [loading,setLoading] = useState(false);
const [error,setError] = useState(false)
const [videos, setVideos] = useState([])
const [videoPrincipal,setVideoPrincipal] = useState(null)

const fetchVideos = async (pageToken = '') => {
  setLoading(true);
  try {
   

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&maxResults=50&order=date&key=${apiKey}`
    );
    
    const searchData = await searchResponse.json();

  
    const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`
    );

  
    const detailsData = await detailsResponse.json();

    const filteredVideos = detailsData.items.filter((video) => {
      const duration = video.contentDetails.duration;
      const match = duration.match(/PT(\d+)M(\d+)?S?/); 
      const minutes = match ? parseInt(match[1] || '0', 10) : 0;
      const seconds = match ? parseInt(match[2] || '0', 10) : 0;
      const totalSeconds = minutes * 60 + seconds;
      return totalSeconds > 60 && totalSeconds <= 480; // 1 min (60s) a 8 min (480s)
    });

    const videoData = filteredVideos.map((video) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
      lancamento: video.snippet.publishedAt,
    }))
    
    setVideos(videoData);

    if (videoData.length > 0) {
      setVideoPrincipal(videoData[0]);
    }

    const response = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoPrincipal.id}&key=${apiKey}`
            );
    const data = await response.json();

    setVideoPrincipal((prevState)=>({
                ...prevState,
                visualizacoes: data.items[0].statistics.viewCount
             }))
    console.log(videoPrincipal)
    localStorage.setItem('cacheVideos', JSON.stringify(videos))
    localStorage.setItem('cacheVideoPrincipal', JSON.stringify(videoPrincipal))

  } catch (error) {
    setLoading(false)
    console.log('Erro ao buscar vídeos:', error);
  }finally{
    setLoading(false)
  }
};

useEffect(()=>{
  const cacheVideos = localStorage.getItem('cacheVideos');
  const cacheVideoPrincipal = localStorage.getItem('cacheVideoPrincipal');

  if(!cacheVideos){
    fetchVideos()
  }else{
    setVideos(JSON.parse(cacheVideos))
    setVideoPrincipal(JSON.parse(cacheVideoPrincipal))
  }
},[])
const dataEmIngles = videoPrincipal &&  new Date(videoPrincipal.lancamento); 

const dataFormatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(dataEmIngles);


return (
    <div id='lancamento' className='overflow-hidden flex-row h-auto p-2 justify-items-center text-left	w-[100%] bg-gradient-to-b from-purple-600 to-[#ff335e]'>
        <h2 className='font-gloria text-6xl font-bold text-white mb-8 align-left'>Lançamentos</h2>
        {videoPrincipal && 
        <>
        <img className='w-full md:w-4/5 drop-shadow-3xl opacity-80 rounded-xl border-solid border-2 border-white' src={videoPrincipal.thumbnail} alt={videoPrincipal.title} />
        <div className='flex-row text-center'>
          <h3 className='text-dourado drop-shadow-lg text-2xl font-bold'>{videoPrincipal.title}</h3>
          <p className='text-6xl font-bold drop-shadow-lg text-dourado'><NumeroAnimado  n={+videoLancamento.visualizacoes}/></p>
          <span className='text-xl text-white drop-shadow-lg'>Visualizações</span>
          <p className='text-white drop-shadow-lg'>Lançamento: {dataFormatoBrasileiro}</p>
          <p className='text-dourado text-xl drop-shadow-lg'>+de <span className='font-bold'>450</span>  inscritos</p>
        </div>
        </>
        }

        <h3 className='mt-6 text-4xl text-white font-bold drop-shadow-lg'>Últimos lançamentos</h3>
        <motion.div className='flex gap-6 mt-4 w-max'
          id="container"
      
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          animate={{
            x: translateX,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
          >
              {!loading && videos.map((m,index)=>{
              if(index!= 0){
                return <div className='w-[300px] drop-shadow-xl flex-row justify-center text-center' onClick={()=> window.open(`https://www.youtube.com/watch?v=${m.id}`, "_blank")}> 
                  <img className='rounded-xl border-solid border-2 border-white z-10' src={m.thumbnail} alt={m.titulo} />
                  <p className='text-white font-bold'>{m.title}</p>
                </div>
                }
              })}
        </motion.div>
    
    </ div>
  )
}

export default Lancamento