import React, { useEffect, useState } from "react";
import genreIds from "../constants";

const getGenreName = (genreId) => {
    return genreIds[genreId] || 'NA'
}

function WatchList() {
    const APITEMPLATE_FOR_BANNER_IMG = 'https://image.tmdb.org/t/p/original'

    const [watchList,setWatchList] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect( () => {
        let watchListedMoviesFromLS = JSON.parse(localStorage.getItem('watchlistMovies'));
        setWatchList(watchListedMoviesFromLS);
    },[])

    const sortRatingAsc = () => {
        console.log("Sorting movies Ascending based on ratings")
        let sortedWatchlist = watchList.sort( (movie1, movie2) => movie1.vote_average - movie2.vote_average)
        setWatchList([...sortedWatchlist])
    }

    const sortRatingDesc = () => {
        console.log("Sorting movies Descending based on ratings")
        let sortedWatchlist = watchList.sort( (movie1, movie2) => movie2.vote_average - movie1.vote_average)
        setWatchList([...sortedWatchlist])
    }

    const sortPopularityAsc = () => {
        console.log("Sorting movies Ascending based on popularity")
        let sortedWatchlist = watchList.sort( (movie1, movie2) => movie1.popularity - movie2.popularity)
        setWatchList([...sortedWatchlist])
    }

    const sortPopularityDesc = () => {
        console.log("Sorting movies Descending based on popularity")
        let sortedWatchlist = watchList.sort( (movie1, movie2) => movie2.popularity - movie1.popularity)
        setWatchList([...sortedWatchlist])
    }

    return (
        <>
            {/* Search Movies with movie titles */}
            <div className="flex justify-center">
                <input 
                    type="text" 
                    placeholder="search movies"
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    className="rounded-md h-7 w-[400px] pl-2 outline-none border border-gray-600"
                
                />
            </div>
            {/* Filter Movies based on Genres */}
            
            {/* Displaying movies on UI */}
            <div className="m-5 shadow-md bg-slate-100 border-gray-200">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-4">Name</th>
                            <th>
                                <div className="flex ">
                                    <i className='fa-solid fa-arrow-up cursor-pointer pr-2' onClick={sortRatingAsc}></i>
                                    <div>Ratings</div>
                                    <i className='fa-solid fa-arrow-down cursor-pointer pl-2' onClick={sortRatingDesc}></i>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                <i className='fa-solid fa-arrow-up cursor-pointer pr-2' onClick={sortPopularityAsc}></i>
                                    <div>Popularity</div>
                                    <i className='fa-solid fa-arrow-down cursor-pointer pl-2' onClick={sortPopularityDesc}></i>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Genre</div>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                <div>Delete</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-t border-gray-100">
                        {
                            watchList
                            .filter((movie) => { 
                                // filtering to apply search functionality
                                if( movie.title.toLowerCase().includes(searchText)){
                                    return true;
                                }
                                return false;
                            })
                            .map((movie) => {
                                return (
                                    <tr className="hover:bg-gray-50">
                                        <td className="flex text-gray-900 items-center px-6 py-4">
                                            <img className="h-[6rem] w-[10rem]" src={`${APITEMPLATE_FOR_BANNER_IMG}${movie.backdrop_path}`} alt={movie.title} />
                                            <div className="font-medium text-gray-700 text-sm px-3">{movie.title}</div>
                                        </td>
                                        <td className="pl-6 py-4">{movie.vote_average}</td>
                                        <td className="pl-6 py-4">{movie.popularity}</td>
                                        <td className="pl-6 py-4">
                                            {movie.genre_ids.map((id)=>{
                                                return (`${getGenreName(id)} ,`)
                                            })}    
                                        </td>
                                        <td className="pl-6 py-4">
                                            <i className="fa-solid fa-trash-can cursor-pointer p-2"></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WatchList;