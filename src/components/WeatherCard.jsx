import React from "react";
import CountUp from "react-countup";
import "./WeatherCard.css"; // Make sure to create this file

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const getBackground = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "sunny-bg";
      case "cloudy":
        return "cloudy-bg";
      case "rain":
      case "rainy":
        return "rainy-bg";
      case "snow":
        return "snow-bg";
      default:
        return "default-bg";
    }
  };

  // Temperature conversion
  const displayTemp =
    unit === "C" ? data.temp : (data.temp * 9 / 5 + 32).toFixed(1);

  return (
    <div
      className={`weather-card card text-center mt-4 ${getBackground(
        data.condition
      )}`}
    >
      <div className="card-body">
        <h2 className="card-title mb-2">
          {data.cityName}, {data.country}
        </h2>

        {/* Weather icon */}
        {data.icon && (
          <img
            src={data.icon}
            alt={data.condition}
            className="mb-2 weather-icon"
          />
        )}

        <h3 className="card-text mb-2">{data.condition}</h3>

        {/* Animated temperature */}
        <h1 className="display-1">
          <CountUp end={displayTemp} duration={1.5} />°{unit}
        </h1>

        <p className="mb-1">Humidity: {data.humidity}%</p>
        <p className="mb-0">Wind: {data.wind} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;
