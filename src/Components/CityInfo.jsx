import React, { useEffect, useState } from "react";
import './CityInfo.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;


const CityInfo = ({ cityName }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const url = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.data && data.data.length > 0) {
                setWeather(data.data[0]);
            }
        };

        getWeather().catch(console.error);

    }, [cityName]);

    return (
        <div className="city-weather-container">
            {weather ? (
                <>
                    <div className="city-weather-main-card">
                        <h2>{weather.city_name}</h2>
                        <img
                        src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                        alt={weather.weather.description}
                        title={weather.weather.description}
                        />
                        <p>Temperature: {weather.temp}°C</p>
                        <p>Description: {weather.weather.description}</p>
                    </div>

                    <div className="city-weather-sub-cards">
                        <div className="weather-sub-card">
                            <h3> Wind</h3>
                            <p> Speed: {weather.wind_spd}m/s</p>
                            <p> Gust: {weather.gust}m/s</p>
                        </div>
                        <div className="weather-sub-card">
                            <h3>Visibility</h3>
                            <p>{weather.vis}km</p>
                        </div>
                        <div className="weather-sub-card">
                            <h3>Humidity</h3>
                            <p>{weather.rh}%</p>
                        </div>
                    </div>
                </>
            ) : 
            null
            }
        </div>
    );
};

export default CityInfo;
