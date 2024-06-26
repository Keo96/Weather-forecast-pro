import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import NotFound from './routes/NotFound';
import Layout from './routes/Layout';
import DetailView from './routes/DetailView';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route index = {false} path='/forecastDetail/:cityName/:date' element={<DetailView />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </React.StrictMode>
</BrowserRouter>
)
