import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const ForecastDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(
                `https://api.weatherbit.io/v2.0/forecast/daily?city=${params.cityName}&key=${API_KEY}&start_date=${params.date}&end_date=${params.date}`
            );
            const data = await response.json();
            if (data && data.data && data.data.length > 0) {
                setFullDetails(data.data[0]);
            } else {
                setFullDetails(null);
            }
        };

        fetchDetails().catch(console.error);
    }, [params.cityName, params.date]);

    return (
        <div>
            {fullDetails ? (
                <div>
                    <h2>Weather Details for {params.cityName} on {params.date}</h2>
                    <p><strong>Min Temperature:</strong> {fullDetails.min_temp}°C</p>
                    <p><strong>Max Temperature:</strong> {fullDetails.max_temp}°C</p>
                    <p><strong>Precipitation:</strong> {fullDetails.precip} mm</p>
                    <p><strong>Wind Speed:</strong> {fullDetails.wind_spd} m/s</p>
                    <p><strong>Relative Humidity:</strong> {fullDetails.rh}%</p>
                    <p><strong>Description:</strong> {fullDetails.weather.description}</p>
                </div>
            ) : (
                <p>Loading weather details...</p>
            )}
        </div>
    );
};

export default ForecastDetail;