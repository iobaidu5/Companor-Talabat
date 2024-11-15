import Image from "next/image";
import React from "react";

const EarnCard = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-[#1f254f] text-white p-4 rounded-lg flex justify-between items-center w-full mx-auto mt-8">
        <div className="flex items-center space-x-2">
            {/* Placeholder Icon */}
            <img src="/flower.png" className="w-20"/>
          <p className="font-bold">
            Save 10% or more on over 100,000 hotels with Member Prices. Also,
            members save up to 30% when you add a hotel to a flight
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-[#0071eb] text-white font-semibold px-4 py-1 rounded-full">
            Sign in
          </button>
          <a href="#" className="underline">
            Learn about One Key
          </a>
        </div>
      </div>

      {/* Card Section */}
      <div className="bg-[#f2f4f7] rounded-lg shadow-lg w-full mx-auto mt-8 flex items-center justify-between">
        {/* Text Content */}
        <div className="space-y-4 p-8">
          <div className="inline-flex items-center px-2 py-1 text-xs font-bold bg-black text-white rounded-full uppercase">
            New
          </div>
          <h2 className="text-3xl font-bold">Earn up to $600 in OneKeyCash™</h2>
          <p className="text-sm text-gray-600">
            after qualifying purchases. Terms apply.
            <br />
            OneKeyCash is not redeemable for cash.
          </p>
          <button className="bg-[#0071eb] text-white font-semibold px-6 py-2 rounded-lg">
            Learn more
          </button>
        </div>
        {/* Image Content */}
        <div className="w-1/2">
          {/* Replace 'your-image-url.jpg' with your actual image path */}
          <img
            src="/girl.png" // replace with actual image path
            alt="Credit Cards"
            className="rounded-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EarnCard;
