import React, { useEffect, useState } from 'react'
import bannerImage from '../assets/deadpool-3.avif'
import axios from 'axios'

const Banner = () => {
  const [bannerImg, setBannerImg] = useState(bannerImage);
  const [movieTitle, setMovieTitle ] = useState('Deadpool X Wolverine');

  const URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e669a3e119fa3ef2295a53aa99a77f50&language=en-US&page=1';
  const APITEMPLATE_FOR_BANNER = 'https://image.tmdb.org/t/p/original'

  useEffect( () => {
      axios.get(URL)
      .then((function(response) {
        // console.log(response.data.results);
        const firstMovie = response.data.results[0];    
        const firstMovieImg = firstMovie.backdrop_path;
        const firstMovieTitle = firstMovie.title;

        setBannerImg(`${APITEMPLATE_FOR_BANNER}${firstMovieImg}`)
        setMovieTitle(firstMovieTitle)

    }))
    .catch(function(error) {
        console.log(error)
    })
  },[])

  return (
    <>
    <div className='h-[50vh]  md:h-[75vh] bg-cover bg-no-repeat bg-center flex items-end'
        style={{backgroundImage: `url(${bannerImg})`, backgroundSize:'96% 100%' }} 
    > 
        <div className='text-white   w-full text-center text-2xl'>
            {movieTitle}
        </div>
    </div>
    </>
  )
}

export default Banner