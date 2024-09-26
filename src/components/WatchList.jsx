import React, { useEffect, useState, useContext } from "react";
import genreIds from "../constants";
import { WatchlistContext } from "./WatchlistContext";

const getGenreName = (genreId) => {
    return genreIds[genreId] || 'NA'
}
const ALL_GENRES = 'All Genres';

function WatchList() {
    const APITEMPLATE_FOR_BANNER_IMG = 'https://image.tmdb.org/t/p/original'

    const {watchList, setWatchList, handleRemoveWatchlist } = useContext(WatchlistContext);
    // const [watchList,setWatchList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [genresList, setGenresList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(ALL_GENRES);

    // useEffect( () => {
    //     let watchListedMoviesFromLS = JSON.parse(localStorage.getItem('watchlistMovies'));
    //     setWatchList(watchListedMoviesFromLS);
    // },[])

    // || for setting Genre filter options ||
    useEffect( () => {
        // flatMap = flattens the result into single level array
        let genreList = watchList.flatMap( (movie) => {
            let tempList = movie.genre_ids.map( (id) => {
                return getGenreName(id)
            })
            return (tempList) // tempList is an array
        })

        genreList = new Set(genreList);
        genreList = [ALL_GENRES,...genreList]
        setGenresList([...genreList])

        console.log("All unique Genres:",genreList)
    }, [watchList])

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
            {/* Adding genres to UI to work as filters */}
            <div className="flex justify-center m-4">
                {
                    genresList.map(genre => {
                        return <div className={
                            selectedGenre === genre
                            ? "flex items-center mx-5 p-2 rounded-md h-8 w-fit bg-blue-400 text-white cursor-pointer"
                            : "flex items-center mx-5 p-2 rounded-md h-8 w-fit bg-gray-400 text-white cursor-pointer"
                        }
                        onClick={() => setSelectedGenre(genre)}
                        >{genre}</div>
                    })
                }
            </div>
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
                                <div className="flex pl-6 py-4">
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
                            .filter( (movie) => {
                                // filtering based on selected genre
                                if( selectedGenre === ALL_GENRES ){
                                    return true;
                                }
                                else{
                                    let movieGenre = movie.genre_ids;
                                    for( let i = 0 ; i < movieGenre.length; i++ ) {
                                        if( selectedGenre === getGenreName( movieGenre[ i ] )){
                                            console.log("Condition passed")
                                            return true;
                                        }
                                    }
                                }
                            })
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
                                        <td className="pl-4 py-4 pr-7" onClick={() => handleRemoveWatchlist(movie) }>
                                            <i className="fa-solid fa-trash-can cursor-pointer p-2 text-red-600"></i>
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