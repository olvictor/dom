import React, { useEffect, useState } from 'react'
import NumeroAnimado from '../NumeroAnimado/NumeroAnimado'

const Lancamento = () => {
  const [translateX, setTranslateX] = useState(420); 
  const [startX, setStartX] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); 
  };
  const apiKey = "AIzaSyBjK1M3gsWEZCA75qYeIXBFzgoVu7vKcqY"
  const channelId = "UCsqWor944vkdqX_fSo2lcxQ"

  const handleTouchMove = (e) => {
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;

      
      const screenWidth = window.innerWidth;
      const componenteWidth = document.getElementById("container").offsetWidth; 
      const maxTranslateX = 450; 
      const minTranslateX = screenWidth - componenteWidth; 
      setTranslateX((prev) => {
        const newTranslateX = prev + deltaX;

        return Math.min(Math.max(newTranslateX, minTranslateX), maxTranslateX);
      });
      
      setStartX(currentX);
    }
  };

  const handleTouchEnd = () => {
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
      const match = duration.match(/PT(\d+)M(\d+)?S?/); // Regex para ISO 8601
      const minutes = match ? parseInt(match[1] || '0', 10) : 0;
      const seconds = match ? parseInt(match[2] || '0', 10) : 0;
      const totalSeconds = minutes * 60 + seconds;
      return totalSeconds > 60 && totalSeconds <= 480; // 1 min (60s) a 8 min (480s)
    });

    setVideos(filteredVideos.map((video) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
    })));
  } catch (error) {
    setLoading(false)
    console.error('Erro ao buscar vídeos:', error);
  }finally{
    setLoading(false)
  }
};

useEffect(()=>{
  fetchVideos()
},[])
console.log(videos)
return (
    <div className='flex-row justify-items-center text-left	w-[100%] bg-gradient-to-b from-purple-600 to-[#ff335e]'>
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
        id="container"
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{
          transform: `translateX(${translateX}px)`,
        }}
        >
            {musicas.map((m,index)=>{
             return <div className='w-[300px] flex-row justify-center text-center' onClick={()=>console.log(index)}> 
                <img className='rounded-2xl z-10' src={m.tumb} alt={m.titulo} />
                <p className='text-white font-bold'>{m.titulo}</p>
              </div>
            })}
        </div>
    </div>
  )
}

export default Lancamento