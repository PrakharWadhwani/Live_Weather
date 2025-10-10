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

  const toggleUnit = () => setUnit(unit === "C" ? "F" : "C");

  const getWeather = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "88bae5927a86d21f6fb06ccab7c9beed",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );

      if (!res.ok) {
        throw new Error("City not found ❌");
      }

      const data = await res.json();

      setWeather({
        cityName: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        tempF: data.current.temp_f,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        icon: data.current.condition.icon,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch weather 😢");
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
      {error && <div className="alert alert-danger mt-3 w-50 text-center">{error}</div>}
      {weather && <WeatherCard data={weather} unit={unit} />}
    </div>
  );
};

export default App;
