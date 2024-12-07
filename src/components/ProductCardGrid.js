import React from "react";
import Link from "next/link";

const ProductCardGrid = ({ food }) => {
  function formatCityName(city) {
    if (!city) return '';
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <Link
      href={`${food.restaurants[0].link}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden w-full cursor-pointer">
        {/* Image Section */}
        <div className="h-56 w-full">
          <img
            src={food.image}
            alt={food.itemName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col space-y-2">
          {/* Title and Category */}
          <div className="flex justify-between w-100">
            <div>
              <h3 className="text-lg font-PoppinsSemiBold">{food.itemName}</h3>
              <p className="text-gray-500 text-sm">👨🏻‍🍳 {formatCityName(food.restaurant)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{food.category}</p>
            </div>
          </div>
          <div className="flex justify-between w-100 py-2">
            <div>
              <p className="text-gray-600 text-sm flex items-center">
                <span className="mr-1">📍</span>
                {formatCityName(food.city)}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm mt-1 line-clamp-2">{food.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-green-300 text-white font-semibold text-sm rounded-md px-3 py-1">
                {food?.info[0]?.icon !="none" ? food?.info[0]?.icon : "☺️"}
              </div>
              <div>
                <p className="text-gray-900 text-sm">{food?.info[0]?.rating || "Very Good"}</p>
                <p className="text-gray-500 text-sm">{food.reviews}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-900 text-sm">{food?.info[0]?.cuisines || "Cuisines"}</p>
            </div>
            <div>
              <p className="text-primary font-PoppinsSemiBold">KD {food.restaurants[0].price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardGrid;
