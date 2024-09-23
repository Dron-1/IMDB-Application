import React from 'react'
import { useState,useEffect, useContext } from 'react'
import moviePoster from '../assets/banner1.jpg'
import Pagination from './Pagination'
import MovieCard from './MovieCard'
import Banner from './Banner'
import axios from 'axios'

// importing context
import { WatchlistContext } from './WatchlistContext'

function Movies() {
    const [movies, setMovies] = useState([
        {
            title:"Movie1", url:moviePoster,
        },
    ]) // added one demo object

    // const [watchList, setWatchList] = useState([]);
    // consuming context API
    const {handleAddWatchlist, handleRemoveWatchlist, watchList, setWatchList} = useContext(WatchlistContext);
    const [pageNo, setPageNo] = useState(1);
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=e669a3e119fa3ef2295a53aa99a77f50&language=en-US&page=${pageNo}`;
    const APITEMPLATE_FOR_BANNER = 'https://image.tmdb.org/t/p/original'

    const handleNext = () => {
        setPageNo(pageNo + 1);
    }

    const handleBack = () => {
        if( pageNo == 1 ) {
            setPageNo(1);
        }
        else{
            setPageNo(pageNo - 1);
        }
    }

    useEffect( () => {
        axios.get(URL)
        .then((function(response) {
        //   console.log(response.data.results);
          setMovies(response.data.results);
        }))
        .catch(function(error) {
            console.log(error)
        })
    },[pageNo])

    // populating LocalStorage as soon as page reloads - mount state
    useEffect( () => {
        const watchListedMoviesFromLS = JSON.parse(localStorage.getItem('watchlistMovies'));
        console.log( watchListedMoviesFromLS );
        setWatchList(watchListedMoviesFromLS);
    },[])

    return(
        <>
            <div className='text-2xl font-bold text-center m-4'>
                <h2>Trending Movies</h2>
            </div>
            <div className="flex justify-evenly flex-wrap gap-6">
                {
                    movies.map((movie,index) => {
                        return <MovieCard 
                                movie={movie} 
                                index={index}
                                handleAddWatchlist={handleAddWatchlist}
                                handleRemoveWatchlist={handleRemoveWatchlist}
                                watchList = {watchList}
                                />
                    })
                }
            </div>
            {/* for pagination */}
            <Pagination handleBack={handleBack} handleNext={handleNext} pageNo={pageNo}/>

        </>
    )
}
export const Home = () => {
  return (
    <>
        {/* <div className='flex align-bottom text-green'>This is Home Page.</div> */}
        <Banner />
        <Movies />
    </>
  )
}
