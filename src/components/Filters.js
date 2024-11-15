// app/components/Filters.tsx
"use client";

import { useState } from "react";

export default function Filters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  const popularFilters = [
    "Manhattan",
    "Hotel",
    "Breakfast included",
    "4 stars",
    "Wonderful 9+",
  ];

  const travelerExperience = [
    "Eco-certified",
    "Business friendly",
    "Family friendly"
  ];
  
  const mealPlans = [
    "Meal plans available",
    "Breakfast included",
    "Dinner included",
    "All inclusive",
    "Lunch included"
  ];
  
  const oneKeyBenefits = [
    "Member prices",
    "Get instant savings when you become a member",
    "VIP Access properties",
    "A collection of top-rated stays"
  ];

  const accessibilityFeatures = [
    "Elevator",
    "Accessible bathroom",
    "Stair-free path to entrance",
    "Sign language-capable staff",
    "In-room accessibility",
    "Roll-in shower",
    "Service animals allowed",
    "Wheelchair accessible parking",
  ];

  const locations = [
    "Manhattan",
    "Midtown",
    "SoHo",
    "Chelsea",
    "Brooklyn",
    "Penn Station",
    "Queens",
    "Kuwait",
    "Long Island City",
    "Williamsburg",
    "Bronx",
    "Downtown Brooklyn",
    "Jamaica",
    "Kuwait",
    "Flushing",
    "Staten Island",
    "Edgewater",
  ];

  const landmarks = [
    "Times Square",
    "Central Park",
    "Broadway",
    "Grand Central",
    "Empire State Building",
    "Madison Square Garden",
    "Bryant Park",
    "Rockefeller Center",
    "Kuwait University",
    "Manhattan",
    "Yankee Stadium",
    "One World Trade Center",
    "Columbia University",
    "Barclays Center Brooklyn",
    "Wall Street",
    "Radio City Music Hall",
    "Flushing",
    "Lincoln Center",
    "Jacob K. Javits",
  ];

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setPriceMin(value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Search Input */}
      <div className="mb-6">
        <h2 className="text-lg font-PoppinsBold text-gray-700 mb-2">Search by property name</h2>
        <input
          type="text"
          placeholder="e.g. Marriott"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Popular Filters */}
      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Popular filters</h3>
        <div className="space-y-2">
          {popularFilters.map((filter) => (
            <label key={filter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-blue-600 w-4 h-4"
              />
              <span className="text-gray-800 text-sm truncate">{filter}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Price</h3>
        <div className="space-y-4">
          <div className="flex">
            <div>
              <label className="block text-sm text-gray-600">Min</label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="ml-2">
              <label className="block text-sm text-gray-600">Max</label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="pt-4">
            <input
              type="range"
              min="0"
              max="1000"
              multiple={true}
              value={priceMin}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceMin}</span>
              <span>${priceMax}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhood */}
      <div className="my-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Neighborhood</h3>
        <div className="space-y-2">
          {locations.map((filter) => (
            <label key={filter} className="flex items-center space-x-2">
              <input type="radio" className="rounded text-blue-600 w-5 h-5" />
              <span className="text-gray-800 text-sm truncate ml-2">
                {filter}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular Locations */}
      <div className="my-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Popular Locations</h3>
        <div className="space-y-2">
          {landmarks.map((filter) => (
            <label key={filter} className="flex items-center space-x-2 mb-1">
              <input type="radio" className="rounded text-blue-600 w-5 h-5" />
              <span className="text-gray-800 text-sm truncate ml-2">
                {filter}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular Filters */}
      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Payment Type</h3>
        <div className="space-y-2">
          {["Reserve now, pay later", "Reserve without credit card"].map(
            (filter) => (
              <label key={filter} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 w-5 h-5"
                />
                <span className="text-gray-800 text-sm truncate">{filter}</span>
              </label>
            )
          )}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Star Rating</h3>
        <div className="flex flex-wrap">
          {[1, 2, 3, 4, 5].map((s) => {
            return (
              <div
                key={s}
                className="bg-white border-2 rounded-lg p-1.5 flex items-center justify-center m-1"
              >
                <span className="text-sm font-semibold mx-2 pb-1">{s}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Accessibility</h3>
        <div className="space-y-2">
          {accessibilityFeatures.map((filter) => (
            <label key={filter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-blue-600 w-4 h-4"
              />
              <span className="text-gray-800 text-sm truncate">{filter}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Traveler experience</h3>
        <div className="space-y-2">
          {travelerExperience.map((filter) => (
            <label key={filter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-blue-600 w-4 h-4"
              />
              <span className="text-gray-800 text-sm truncate">{filter}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">Meal plans available</h3>
        <div className="space-y-2">
          {mealPlans.map((filter) => (
            <label key={filter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-blue-600 w-4 h-4"
              />
              <span className="text-gray-800 text-sm truncate">{filter}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-PoppinsBold text-gray-700 text-[1rem] mb-3">One Key benefits and discounts</h3>
        <div className="space-y-2">
          {oneKeyBenefits.map((filter) => (
            <label key={filter} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-blue-600 w-4 h-4"
              />
              <span className="text-gray-800 text-sm truncate">{filter}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
