import React from "react";
import About from "./About";
import { Route,Routes, Link } from "react-router-dom";
import WatchList from "./WatchList";
import NotFound from "./NotFound";
import { Home } from "./Home";
import Logo from "../assets/IMDB_Logo.png"

function NavigationBar() {
    return(
        <>  
            <div className="flex py-7 pl-6 space-x-8 items-center justify-end">
                <Link to='/'><img className='w-[50px]' src={Logo} alt="IMDB Logo" /></Link>
                <Link to='/' className="text-blue-400">Movies</Link>
                <Link to='/watchlist' className="text-blue-400">Watchlist</Link>
                <Link to='/about' className="text-blue-400">About</Link>
            </div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/watchlist" element={<WatchList></WatchList>}></Route>
                <Route path="/*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </>
    )
}

export default NavigationBar;