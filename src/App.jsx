import React, { useState, useEffect } from 'react';
import './App.css';
import CityInfo from './Components/CityInfo'; 
import ForecastList from './Components/ForecastList';
import WeatherChart from './Components/WeatherChart';
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const App = () => {
    const [cityName, setCityName] = useState('');
    const [searchQuery, setSearchQuery] = useState('Seattle');
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchForecastData = async () => {
            
            const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&days=7&key=${API_KEY}`);
            const data = await response.json();
            setForecastData(data.data);
        };

        fetchForecastData().catch(console.error);
    }, [searchQuery]);

    const handleSearch = () => {
        setSearchQuery(cityName); // Sets the search query to the current input value
    };

    useEffect(() => {
        if (!cityName) {
            setSearchQuery('Seattle');
        }
    }, [cityName]);

    return (
        <div className="App">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <CityInfo cityName={searchQuery} />
            <div className="chart-container">
                <WeatherChart forecastData={forecastData} />
            </div>
            <ForecastList cityName={searchQuery} />
        </div>
    );
};

export default App;
