// https://nerdcave.com/tailwind-cheat-sheet
import { useState } from 'react'
import './App.css'
import NavigationBar from './components/NavigationBar'
import { WatchlistContextWrapper } from './components/WatchlistContext.jsx'

function App() {
  return (
    <div>
      <h1>IMDb</h1>
      <NavigationBar />
    </div>
  )
}

export default App
