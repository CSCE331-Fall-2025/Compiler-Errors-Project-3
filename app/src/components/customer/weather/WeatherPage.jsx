import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";

// Weather icons
import clearIcon from "../weather/Clear.png";
import cloudsIcon from "../weather/Cloudy.png";
import rainIcon from "../weather/Rain.png";
import snowIcon from "../weather/Snow.png";
import thunderstormIcon from "../weather/Thunderstorm.png";
import drizzleIcon from "../weather/Drizzle.png";
import "../../../css/weather.css";


function WeatherPage() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const weatherIcons = {
        Clear: clearIcon,
        Clouds: cloudsIcon,
        Rain: rainIcon,
        Snow: snowIcon,
        Thunderstorm: thunderstormIcon,
        Drizzle: drizzleIcon
    };

    useEffect(() => {
        async function loadWeather() {
            try {
                const res = await fetch("http://localhost:3000/api/weather");
                const data = await res.json();
                console.log("Weather data:", data);

                if (!data || !data.current) {
                    setError("Weather data unavailable. (API returned no current weather)");
                }

                setWeather(data);
            } catch (err) {
                console.error("Error loading weather:", err);
                setError("Failed to fetch weather.");
            }

            setLoading(false);
        }

        loadWeather();
    }, []);

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    const current = weather.current;
    const daily = weather.daily;
    const currentIcon = weatherIcons[current.weather[0].main] || clearIcon;

    return (
        <>
            <NavBar />
            <div className="weather-page">
                <div className="weather-container">
                    {/* Left side - Today's weather */}
                    <div className="weather-today-section">
                        <h1>Weekly Weather</h1>
                        <h2>Today</h2>
                        
                        <img 
                            src={currentIcon}
                            alt={current.weather[0].main}
                            className="weather-today-icon"
                        />

                        <div className="weather-today-temp">
                            {Math.round(current.temp)}°F
                        </div>

                        <div className="weather-today-details">
                            <div><strong>Temperature:</strong> {current.temp}°F</div>
                            <div><strong>Feels Like:</strong> {current.feels_like}°F</div>
                            <div><strong>Conditions:</strong> {current.weather[0].description}</div>
                        </div>
                    </div>

                    {/* Right side - 7-Day Forecast */}
                    <div className="weather-forecast-section">
                        <h2>7-Day Forecast</h2>

                        <div className="weather-forecast-grid">
                            {daily.map((day, index) => {
                                const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric"
                                });

                                const icon = weatherIcons[day.weather[0].main] || clearIcon;

                                return (
                                    <div key={index} className="weather-card">
                                        <h3>{date}</h3>

                                        <img
                                            src={icon}
                                            alt={day.weather[0].main}
                                        />

                                        <div className="weather-card-temps">
                                            <div>High: {Math.round(day.temp.max)}°F</div>
                                            <div>Low: {Math.round(day.temp.min)}°F</div>
                                        </div>
                                        
                                        <div className="weather-card-condition">
                                            {day.weather[0].main}
                                        </div>

                                        <p className="weather-description">
                                            {day.weather[0].description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeatherPage;