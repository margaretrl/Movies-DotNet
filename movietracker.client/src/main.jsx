import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

axios.get('/api/movies').then(({ data }) => {
    ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialMovieList={data}/>
  </StrictMode>,
)
});
