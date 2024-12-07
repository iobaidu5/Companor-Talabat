import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import axios from "axios";

const SearchForm = () => {
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [disabledRestaurant, setDisabledRestaurant] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery === '') return;
    const fetchFoodItems = async () => {
      try {
        router.push(`/food-details?searchedFood=${debouncedSearchQuery}`);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((data) => {
        const sortedCities = data.cities.sort((a, b) => b.cityName.localeCompare(a.cityName));
        setCities(sortedCities);
      });
  }, []);

  const fetchRestaurants = (cityId) => {
    fetch(`/api/restaurants?cityId=${cityId}`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data.restaurants));
  };

  const handleCityChange = (e) => {
    setSelectedCity(e);
    fetchRestaurants(e.value);
    setDisabledRestaurant(false);
  };

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e);
    router.push(`/food-details?cityId=${selectedCity.value}&restaurantId=${e.value}`);
  };

  return (
    <div className="w-full mx-auto bg-white px-6 py-4 rounded-lg shadow-md mb-5">
      <div className="max-w-10xl mx-auto bg-white p-6 rounded-lg">
        <div className="flex items-center justify-center gap-6">
          {/* City Selection */}
          <div className="w-full">
            <label className="text-gray-600 hover:text-primary-indigo-hover font-bold text-lg font-nunito hidden lg:block">
              Select City
            </label>
            <Select
              options={cities.map((city) => ({
                value: city._id,
                label: city.cityName,
              }))}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '48px',
                  borderRadius: '8px',
                  borderColor: '#cbd5e0', // Gray-300
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  '&:hover': { borderColor: '#4299e1' }, // Blue-500 on hover
                  borderWidth: '2px',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#a0aec0', // Gray-400
                }),
              }}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Choose a city"
              className="w-full"
              classNamePrefix="select"
            />
          </div>

          {/* Restaurant Selection */}
          <div className="w-full">
            <label className="text-gray-600 hover:text-primary-indigo-hover font-bold text-lg font-nunito hidden lg:block">
              Select Restaurant
            </label>
            <Select
              options={restaurants.map((restaurant) => ({
                value: restaurant._id,
                label: restaurant.name,
              }))}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '48px',
                  borderRadius: '8px',
                  borderColor: '#cbd5e0', // Gray-300
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  '&:hover': { borderColor: '#4299e1' }, // Blue-500 on hover
                  borderWidth: '2px',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#a0aec0', // Gray-400
                }),
              }}
              value={selectedRestaurant}
              onChange={handleRestaurantChange}
              placeholder="Choose a restaurant"
              className="w-full"
              classNamePrefix="select"
              isDisabled={disabledRestaurant}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
