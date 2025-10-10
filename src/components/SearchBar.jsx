import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-2 mb-4 w-75"
    >
      <input
        type="text"
        className="form-control bg-secondary text-light border-0"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className="btn btn-info fw-semibold">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
