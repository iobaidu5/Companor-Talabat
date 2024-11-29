import React from "react";
import Link from "next/link";

const ProductCard = ({ food }) => {
  function formatCityName(city) {
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    // Wrap the entire card with the Link component
    <Link href={`/product/${food.id}`} passHref>
      <div className="border border-gray-200 rounded-lg shadow-md flex overflow-hidden w-full cursor-pointer">
        {/* Image Section */}
        <div className="h-56 w-2/5">
          <img
            src={food.image}
            alt={food.itemName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-3/5 p-4 flex flex-col justify-between">
          {/* Title and Category */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-PoppinsSemiBold">{food.itemName}</h3>
              <p className="text-gray-500 text-sm">👨🏻‍🍳 {formatCityName(food.restaurant)}</p>
            </div>
            <div><p className="text-gray-500 text-sm">{food.category}</p></div>
          </div>

          <p className="text-gray-600 text-sm flex items-center mt-1">
            <span className="mr-1">📍</span>
            {formatCityName(food.city)}
          </p>

          <p className="text-gray-700 text-sm mt-2 line-clamp-2">
            {food.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 text-white font-semibold text-sm rounded-md px-3 py-1">
                {(4).toFixed(1)}
              </div>
              <div>
                <p className="text-gray-900 text-sm">Very Good</p>
                <p className="text-gray-500 text-sm">{food.reviews} reviews</p>
              </div>
            </div>
            <div>
              <p className="text-gray-900 text-sm mt-4">{food.restaurants[0].source}</p>
            </div>
            <div>
              <p className="text-primary font-PoppinsSemiBold mt-4">KD {food.restaurants[0].price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
