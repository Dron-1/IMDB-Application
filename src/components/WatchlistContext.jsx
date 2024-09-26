import { createContext, useState, useEffect } from "react";

// createContext() function creates the context object for the application
// this object has 2 properties:
// 1. .Provider = use to provide data to the components wrapped inside
// 2. .Consumer = used to consume the context in class components (although in functional components, we typically use the useContext hook instead).
const WatchlistContext = createContext();

const WatchlistContextWrapper = ({children}) => {

    const [watchList,setWatchList] = useState([]);
    // populating LocalStorage as soon as page reloads - mount state
    useEffect( () => {
        const watchListedMoviesFromLS = JSON.parse(localStorage.getItem('watchlistMovies'));
        console.log( watchListedMoviesFromLS );
        setWatchList(watchListedMoviesFromLS);
    },[])

    const handleAddWatchlist = (movie) => {
        console.log("handleAddWatchlist called", movie)
        let updatedArr = [...watchList, movie];
        setWatchList(updatedArr); // {IMPORTANT: setWatchList is async function in react }
        console.log("watchList array:",watchList)

        //|| --- Adding to LocalStorage ---||
        localStorage.setItem('watchlistMovies',JSON.stringify(updatedArr));
    }
    const handleRemoveWatchlist = (movie) => {
        let filteredArr = watchList.filter( (movieObj) => {
            return movie.id !== movieObj.id
        } )

        setWatchList(filteredArr);
        console.log(watchList);
        //|| --- Adding to LocalStorage ---||
        localStorage.setItem('watchlistMovies',JSON.stringify(filteredArr));
    }

    return(
        <WatchlistContext.Provider 
            value={{ handleAddWatchlist, handleRemoveWatchlist, watchList, setWatchList }}
        >
            {children}
        </WatchlistContext.Provider>
    )
}

export { WatchlistContext, WatchlistContextWrapper }; // will wrap main.jsx inside provider 