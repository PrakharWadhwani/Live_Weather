import React from "react";
import "./WeatherCard.css"; // make sure to import your CSS

const WeatherCard = ({ data, unit }) => {
  const temp = unit === "C" ? data.tempC : data.tempF;

  // Determine background class based on weather condition
  const condition = data.condition.toLowerCase();
  let bgClass = "default-bg";
  if (condition.includes("sun")) bgClass = "sunny-bg";
  else if (condition.includes("cloud")) bgClass = "cloudy-bg";
  else if (condition.includes("rain")) bgClass = "rainy-bg";
  else if (condition.includes("snow")) bgClass = "snow-bg";

  return (
    <div className={`weather-card ${bgClass} shadow mt-4 text-center`}>
      <img src={data.icon} alt={data.condition} className="weather-icon mt-3" />
      <h5 className="mt-2">{data.cityName}, {data.country}</h5>
      <p className="display-4 fw-bold">{temp}°{unit}</p>
      <p>{data.condition}</p>
      <p>Humidity: {data.humidity}% | Wind: {data.wind} km/h</p>
    </div>
  );
};

export default WeatherCard;
