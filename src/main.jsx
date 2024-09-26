import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { WatchlistContextWrapper } from './context/WatchlistContext.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <WatchlistContextWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </WatchlistContextWrapper>
    </React.StrictMode>
  </Provider>
)
