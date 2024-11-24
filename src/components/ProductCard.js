import React from "react";

const ProductCard = ({ food }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md flex overflow-hidden w-full">
      {/* Image Section */}
      <div className="h-56 w-2/5">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-3/5 p-4 flex flex-col justify-between">
        {/* Title and Category */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-PoppinsSemiBold">{food.name}</h3>
          <p className="text-gray-500 text-sm">{food.category}</p>
        </div>

        {/* Location */}
        <p className="text-gray-600 text-sm flex items-center mt-1">
          <span className="mr-1">📍</span>
          {food.location}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm mt-2 line-clamp-2">
          {food.description}
        </p>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Score Badge */}
            <div className="bg-green-600 text-white font-semibold text-sm rounded-md px-3 py-1">
              {(4).toFixed(1)}
            </div>
            {/* Rating Details */}
            <div>
              <p className="text-gray-900 text-sm">Very Good</p>
              <p className="text-gray-500 text-sm">{5} reviews</p>
            </div>
          </div>
          <p className="text-primary font-PoppinsSemiBold mt-4">From ${food.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
