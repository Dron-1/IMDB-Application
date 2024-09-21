import React from 'react'

const MovieCard = (props) => {
    // const {movie} = movie;
    const {movie, index,handleAddWatchlist,handleRemoveWatchlist, watchList} = props;
    const APITEMPLATE_FOR_BANNER = 'https://image.tmdb.org/t/p/original'
    // console.log("MovieCard-Props::",movie,index, handleAddWatchlist, handleRemoveWatchlist);
    const isMovieWatchListed = () => {
        // result will be -1 if not found else the index (positive number)
        for(let i = 0; i < watchList.length; i++ ) {
            if( movie.id == watchList[ i ].id ) {
                return true;
            }
        }
        return false;
    }
    return (
        // <div>hello</div>
        <div 
            className='w-[200px] h-[20vh] bg-center bg-cover rounded-xl flex-col justify-between items-end hover:scale-110 duration-200 cursor-pointer' 
            style={{backgroundImage:`url(${APITEMPLATE_FOR_BANNER}${movie.backdrop_path})`}} key={index} >
            <div className='text-white text-center flex justify-between w-full p-2 rounded-lg bg-gray-900/50 '>
                {movie.title}
                {
                    isMovieWatchListed() ?
                    <div className='text-end' onClick={() => handleRemoveWatchlist(movie)}>
                        <i className="fa-solid fa-square-plus" ></i>
                    </div>
                    :
                    <div className='text-end'>
                        <i className="fa-regular fa-square-plus" onClick={() => handleAddWatchlist(movie)}></i>
                    </div>
                }
            </div>
        </div>
    )
}

export default MovieCard