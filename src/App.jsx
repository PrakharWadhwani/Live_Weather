import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C"); 

  //pls dont use it i only have 100 reqs a month counter is already 2 
  const API_KEY = "88bae5927a86d21f6fb06ccab7c9beed";

  const toggleUnit = () => {
        setUnit(unit === "C" ? "F" : "C");
      };
  const getWeather = async (searchCity) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(
          searchCity
        )}`
      );
      const data = await res.json();

      if (data.error) {
        setError("City not found ❌");
        setLoading(false);
        return;
      }

      

      setWeather({
        cityName: data.location.name,
        country: data.location.country,
        temp: data.current.temperature,
        condition: data.current.weather_descriptions[0] || "N/A",
        humidity: data.current.humidity,
        wind: data.current.wind_speed,
        icon: data.current.weather_icons?.[0] || "",
     });

     

    } catch (err) {
      setError("Failed to fetch weather 😢");
    } finally {
      setLoading(false);
    }
  };

  

  return (
  <div className="bg-dark text-light min-vh-100 d-flex flex-column align-items-center justify-content-start py-5">
    <h1 className="fw-bold mb-4 text-info">🌤 Weather App</h1>
    <div className="mb-3">
      <button onClick={toggleUnit} className="btn btn-secondary">
        Show in °{unit === "C" ? "F" : "C"}
      </button>
    </div>
    <SearchBar onSearch={getWeather} />
    {loading && <Loader />}
    {error && (
      <div className="alert alert-danger mt-3 w-50 text-center">{error}</div>
    )}
    {weather && <WeatherCard data={weather} unit={unit} />}
  </div>
);

};

export default App;
