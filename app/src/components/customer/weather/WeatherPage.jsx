import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar"
// Weather icons
import clearIcon from "../weather/Clear.png";
import cloudsIcon from "../weather/Cloudy.png";
import rainIcon from "../weather/Rain.png";
import snowIcon from "../weather/Snow.png";
import thunderstormIcon from "../weather/Thunderstorm.png";
import drizzleIcon from "../weather/Drizzle.png";

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
    }

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
            <div style={{ padding: "2rem" }}>
                <h1>Weekly Weather</h1>

                <h2>Today</h2>
                <img 
                    src={currentIcon}
                    alt={current.weather[0].main}
                    style={{ width: "90px", marginBottom: "1rem" }}
                />
                <p><strong>Temperature:</strong> {current.temp}°F</p>
                <p><strong>Feels Like:</strong> {current.feels_like}°F</p>
                <p><strong>Conditions:</strong> {current.weather[0].description}</p>

                <h2 style={{ marginTop: "2rem" }}>7-Day Forecast</h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem"
                }}>

                    {daily.map((day, index) => {
                        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric"
                        });

                        const icon = weatherIcons[day.weather[0].main] || clearIcon;

                        return (
                            <div key={index} style={{
                                padding: "1rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                textAlign: "center"
                            }}>
                                <h4>{date}</h4>

                                <img
                                    src={icon}
                                    alt={day.weather[0].main}
                                    style={{ width: "60px", marginBottom: "0.5rem" }}
                                />

                                <p>High: {day.temp.max}°F</p>
                                <p>Low: {day.temp.min}°F</p>
                                <p>{day.weather[0].main}</p>
                                <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                                    {day.weather[0].description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default WeatherPage;
