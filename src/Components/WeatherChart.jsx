import React, { Component, useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';

const WeatherChart = ({ forecastData }) => {
    
    const temperatureData = forecastData.map(day => ({
        date: day.valid_date,
        temp: day.temp
    }));

    const humidityData = forecastData.map(day => ({
        date: day.valid_date,
        humidity: day.rh
    }));

    return (
        <div>
            <div>
                <h2>Change in Temperature</h2>
                <LineChart width={600} height={300} data={temperatureData}>
                    <Line type="monotone" dataKey="temp" stroke="#000000" activeDot={{ r: 8 }} />
                    <CartesianGrid stroke="#ffdd00" strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
            <div>
                <h2>Change in Relative Humidity</h2>
                <BarChart width={600} height={300} data={humidityData}>
                    <Bar dataKey="humidity" fill="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </BarChart>
            </div>
        </div>
    );
};

export default WeatherChart;