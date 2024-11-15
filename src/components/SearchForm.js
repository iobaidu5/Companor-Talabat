import React, { useState, useRef, useEffect } from "react";
import DateDisplay from "./DateDisplay";
import { useRouter } from "next/router";
import Select from "react-select";
// import { MdPlace, MdCalendarToday, MdPerson } from 'react-icons/md';

const SearchForm = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([
    { value: "mcdonalds", label: "McDonalds" },
    { value: "burger-king", label: "Burger King" },
    { value: "subway", label: "Subway" },
    { value: "starbucks", label: "Starbucks" },
    { value: "chipotle", label: "Chipotle" },
    // Add more restaurants here
  ]);
  const [foodItems, setFoodItems] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedFoodItem, setSelectedFoodItem] = useState("");

  // const handleCityChange = (city) => {
  //   setSelectedCity(city);
  //   setIsOpen(false); // Close dropdown after selection
  // };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data.cities));
  }, []);

  const fetchRestaurants = (cityId) => {
    fetch(`/api/restaurants?cityId=${cityId}`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data.restaurants));
  };

  // const fetchFoodItems = (cityId, restaurantId) => {
  //   fetch(`/api/fooditems?cityId=${cityId}&restaurantId=${restaurantId}`)
  //     .then((res) => res.json())
  //     .then((data) => setFoodItems(data.foodItems));
  // };

  const handleCityChange = (e) => {
    console.log("handleCityChange _> ", e)
    setSelectedCity(e);
    fetchRestaurants(e.value);
  };

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e);
    router.push(
      `/food-details?cityId=${selectedCity.value}&restaurantId=${e.value}`
    );
   //fetchFoodItems(selectedCity, e.value);
  };

  const [selectedHotel, setSelectedHotel] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const dropdownRef1 = useRef(null);

  const handleLocationChange = (city) => {
    setSelectedHotel(city);
    setIsOpen1(false); // Close dropdown after selection
  };

  const handleClickOutside1 = (event) => {
    if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
      setIsOpen1(false); // Close the dropdown if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside1);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected City:", selectedCity);
    console.log("Selected Restaurant:", selectedRestaurant);
    console.log("Selected Food Item:", selectedFoodItem);
    // Add your form submission logic here
  };

  const handleSearch = () => {
    if (selectedCity && selectedRestaurant) {
      router.push(
        `/food-details?cityId=${selectedCity}&restaurantId=${selectedRestaurant}`
      );
    } else {
      alert("Please select both city and restaurant.");
    }
  };

  return (
    <div className="w-full mx-auto mt-8 bg-white p-4 rounded-lg shadow-md border border-gray-300">
      {/* Navigation Tabs */}
      {/* <div className="flex justify-center space-x-4 mb-4 border-b border-gray-200">
        {[
          "Stays",
          "Flights",
          "Cars",
          "Packages",
          "Things to do",
          "Cruises",
        ].map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-3 font-semibold ${
              index === 0
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div> */}

      <div className="max-w-4xl mx-auto bg-white p-6  rounded-md">
        <h2 className="text-2xl font-PoppinsBold text-center mb-4">Find Food Item</h2>

        <div className="flex items-center justify-center">
          <div className="mb-4 w-2/4 z-50">
            <label className="block mb-1 font-PoppinsSemiBold text-gray-700 text-[1rem]">Select City</label>
            <Select
                options={cities.map(city => ({
                  value: city._id,
                  label: city.cityName,
                }))}
              styles={{
                indicatorSeparator: () => ({
                  display: 'none',
                }),
              }}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Choose a city"
              className="w-full"
              classNamePrefix="select"
            />
          </div>

          <div className="mb-4 w-2/4 z-50 mx-4">
            <label className="block mb-1 font-PoppinsSemiBold text-gray-700 text-[1rem]">
              Select Restaurant
            </label>
            <Select
              options={restaurants.map(restaurant => ({
                value: restaurant._id,
                label: restaurant.name,
              }))}
              value={selectedRestaurant}
              styles={{
                indicatorSeparator: () => ({
                  display: 'none', // Remove the separator
                }),
              }}
              onChange={handleRestaurantChange}
              placeholder="Choose a restaurant"
              className="w-full"
              classNamePrefix="select"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
        {/* <div className="flex items-center gap-4">
          <div className="w-1/4">
            <label className="block mb-1 text-sm font-medium">City</label>
            <select
              onChange={handleCityChange}
              value={selectedCity}
              className="w-full p-2 border rounded"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/4">
            <label className="block mb-1 text-sm font-medium">Restaurant</label>
            <select
              onChange={handleRestaurantChange}
              value={selectedRestaurant}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-blue-600 rounded"
          >
            Search
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SearchForm;
