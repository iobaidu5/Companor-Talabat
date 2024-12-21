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
  const [selectedState, setSelectedState] = useState(null);

  const handleClick = (stateName) => {
    setSelectedState(selectedState === stateName ? null : stateName);
  };

  const states = [
    {
      name: "Kuwait City", cities: [
        "Nahda",
        "Jaber Al Ahmad",
        "Qortuba",
        "Yarmouk",
        "Dasma",
        "Shuwaikh Educational",
        "North West Sulaibikhat",
        "Shuwaikh Medical",
        "Shuwaikh Residential",
        "Shuwaikh Administrative",
        "Shuwaikh Industrial 1",
        "Shuwaikh Industrial 2",
        "Shuwaikh Industrial 3",
        "Qadsiya",
        "Nuzha",
        "Adailiya",
        "Salhiya",
        "Daiya",
        "Surra"
      ]
    },
    {
      name: "Hawally", cities: [
        "Hitteen",
        "Salam",
        "Al-Bedae",
        "test-101",
        "Jabriya",
        "Bayan",
        "Zahra",
        "Ministries Zone",
        "Rumaithiya",
        "Maidan Hawally",
        "Hawally",
        "Mubarak Al-Abdullah - West Mishref",
        "Shuhada",
        "Siddiq",
        "Salmiya",
        "Mishrif",
        "Shaab",
        "Salwa"
      ]
    },
    {
      name: "Farwaniya", cities: [
        "Andalous",
        "Kuwait Free Trade Zone",
        "Ardhiya 4",
        "Ferdous",
        "Ardhiya",
        "Sabah Al-Nasser",
        "West Abdullah Al Mubarak",
        "South Abdullah Al Mubarak",
        "Farwaniya",
        "Jeleeb Al-Shuyoukh",
        "Khaitan",
        "Rai",
        "Ashbeliah",
        "Abdullah Al-Mubarak - West Jeleeb",
        "Reggai",
        "Omariya",
        "Rabiya",
        "Rehab",
        "Sheikh Saad Al Abdullah Airport"
      ]
    },
    {
      name: "Ahmadi", cities: [
        "Abu Halifa",
        "Wafra residential",
        "Sabah Al Ahmad Marine City",
        "Wafra farms",
        "Mahboula",
        "Khairan",
        "Riqqa",
        "Nuwaiseeb",
        "Zour",
        "Shalayhat Al Dubaiya",
        "Sabah Al Ahmad 2",
        "Bnaider",
        "Al-Julaia'a",
        "South Sabahiya",
        "Sabah Al Ahmad 4",
        "Fintas",
        "Bnaider-test",
        "Talabat Island",
        "Magwa"
      ]
    },
    {
      name: "Al Jahra", cities: [
        "Jahra - Sulaibiya",
        "Jahra - Al Naeem",
        "Jahra - Amgarah Industrial",
        "Jahra - Taima",
        "Jahra - Oyoun",
        "Jahra - Kabd",
        "Al Mutla",
        "Jahra - Qasr",
        "Jahra - Sulaibiya Industrial 1",
        "Jahra - Jahra Industrial Area",
        "Jahra - Jahra Area",
        "Jahra - Sulaibiya Industrial 2",
        "Jahra - Sulaibiya Residential",
        "Jahra - Nasseem",
        "Jahra - Waha",
        "Jahra Qairawan - South Doha",
        "Jahra - Saad Al Abdullah"
      ]
    },
    {
      name: "Mubarak Al-kabir", cities: [
        "Al-Qusour",
        "Abu Ftaira",
        "West Abu Fetera Small Indust",
        "Al Masayel",
        "Messila",
        "Al-Qurain",
        "Fnaitess",
        "Sabah Al-Salem",
        "Adan",
        "Abu Hasaniya",
        "Sabhan Industrial",
        "South Wista",
        "Wista",
        "Mubarak Al-Kabir"
      ]
    },
  ];

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
        setCities(data.cities);
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

  const handleCityFromState = (e) => {
    router.push(`/food-details?foodByCityName=${e}`);
    setSelectedState(null)
  };

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e);
    router.push(`/food-details?cityId=${selectedCity.value}&restaurantId=${e.value}`);
  };

  return (
    <div className="w-full mx-auto bg-white px-6 pb-4 rounded-lg shadow-md mb-5 border border-gray-300">
      <div className="max-w-10xl mx-auto bg-white p-6 rounded-lg">
        {/* Tabs Section */}

        <div className="flex justify-center mb-6 space-x-4 border-b border-gray-300 pb-4">
          {states.map((state, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
            >
              <div
                className={`font-semibold text-lg px-2 py-1 transition-all ${selectedState === state.name ? 'border-b-2 border-customOrange' : ''
                  }`}
                onClick={() => handleClick(state.name)}
              >
                {state.name}
              </div>

              {selectedState === state.name && (
                <div className="absolute left-0 w-6xl rounded-lg bg-white shadow-md transition-opacity duration-300" style={{ zIndex: "10000" }}>
                  <div className="py-2">
                    {state.cities.map((city, i) => (
                      <div key={i} className="px-4 py-2 text-gray-600  font-bold text-md font-nunito hover:bg-gray-100 cursor-pointer whitespace-nowrap" onClick={() => handleCityFromState(city)}>
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
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
