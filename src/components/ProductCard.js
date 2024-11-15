// components/ProductCard.js

import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 relative">
      {/* Discount Badge */}
      <div className="absolute top-6 left-6 bg-yellow-400 text-black font-PoppinsBold px-2 py-1 rounded-md text-sm">
        {product.discount || product.restaurants[0].price} Off
      </div>

      {/* Product Image */}
      <img
        src={product.image != "/assets/images/img-placeholder.svg" ? product.image : `/images/${Math.floor(Math.random() * 10) + 1}.png`}
        alt={product.itemName}
        className="w-full h-56 object-cover mb-4"
      />

      {/* Store and Brand Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2">🇰🇼</span> 
          <span className="text-gray-500 text-sm mr-1">{product.restaurants[0].source}</span>
        </div>
        <span className="text-black font-PoppinsBold">{product.category}</span>
      </div>

      {/* Product Title */}
      <h2 className="text-gray-900 text-[1rem] mb-2 leading-tight truncate">
        {product.itemName}
      </h2>

      <div className="flex justify-between w-full mt-3">
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-black font-PoppinsBold text-lg">{product.restaurants[0].price}</span>
          <span className="line-through text-sm text-red-500">
          {product.restaurants[0].price}
          </span>
        </div>

        {/* Cart Icon */}
        {/* <button className="mt-2 bg-yellow-500 p-2 rounded-xl flex items-center justify-center"> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path d="M3 3h2l3.6 7.59-1.35 2.44A1 1 0 008 15h12v-2H8.42l1.1-2H18a1 1 0 00.92-.63l3.25-7.25A1 1 0 0021.25 2H5l-.94-2H1v2h2l3.6 7.59L5.24 12H1v2h4a1 1 0 00.9-.55L7.45 9H3z" />
        </svg>
        {/* </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
