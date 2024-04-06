import React, { useState, useEffect } from 'react';
import './ForecastList.css';
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const ForecastList = ({ cityName }) => {
    const [forecastData, setForecastData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [windSpeed, setWindSpeed] = useState(10); // Example default wind speed


    useEffect(() => {
        const fetchForecastData = async () => {
            const response = await fetch(
                `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&days=7&key=${API_KEY}`
            );
            const data = await response.json();
            setForecastData(data.data);
            setFilteredData(data.data);
        };
        
            fetchForecastData().catch(console.error);
        
    }, [cityName]);

    const handleFilter = () => {
        const filtered = forecastData.filter(day => {
            const matchesDate = filterDate ? day.valid_date === filterDate : true;
            const matchesWindSpeed = day.wind_spd <= windSpeed;
            return matchesDate && matchesWindSpeed;
        });
        setFilteredData(filtered);
    };

    return (
        <div className="forecast-list">
            <h2>7-Day Weather Forecast for {cityName}</h2>
            <div className="filter-controls">
                <label htmlFor="dateInput">Date: </label>
                <input
                    id="dateInput"
                    type="date"
                    placeholder="Enter Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                <label htmlFor="windSpeedInput"> Wind Speed:</label>
                <input
                    id="windSpeedInput"
                    type="range"
                    min="0"
                    max="20"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(e.target.value)}
                />
                <button onClick={handleFilter}>Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weather</th>
                        <th>Temp (°C)</th>
                        <th>Max Temp (°C)</th>
                        <th>Min Temp (°C)</th>
                        <th>Wind (m/s)</th>
                        <th>Description</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((day) => (
                        <tr key={day.valid_date}>
                            <td>{day.valid_date}</td>
                            <td>
                                <img
                                    src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                                    alt={day.weather.description}
                                    title={day.weather.description}
                                    style={{width: '30px', height: 'auto'}}
                                />
                            </td>
                            <td>{day.temp}</td>
                            <td>{day.max_temp}</td>
                            <td>{day.min_temp}</td>
                            <td>{day.wind_spd}</td>
                            <td>{day.weather.description}</td>
                            <td>
                                <Link 
                                    style={{ textDecoration: "none" }}
                                    to={`/forecastDetail/${cityName}/${day.valid_date}`}
                                >
                                    🔗
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ForecastList;
