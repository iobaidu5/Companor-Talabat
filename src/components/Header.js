import Link from "next/link";
import React from "react";
// import { FaGlobe, FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="bg-white shadow-md font-PoppinsSemiBold">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        {/* Left Side - Companor Name and Shop travel */}
        <div className="flex items-center space-x-8">
          {/* Companor Name */}
          <Link href="/" className="flex items-center space-x-1">
            {/* <span className="font-semibold text-lg text-gray-800">Companor</span> */}
            <img src="/loogo.png" className="rounded-xl w-44" />
          </Link>
        </div>

        {/* Right Side - Menu Items */}
        <div className="flex items-center space-x-6 text-gray-800">
          <button className="border border-gray-300 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-gray-100">
            Get the app
          </button>

          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>

            <span>English</span>
          </div>

          {/* Other Links */}
          <a href="#" className="font-PoppinsSemiBold hover:text-blue-600">
            List your property
          </a>
          <a href="#" className="font-PoppinsSemiBold hover:text-blue-600">
            Support
          </a>
          <a href="#" className="font-PoppinsSemiBold hover:text-blue-600">
            Trips
          </a>

          {/* Sign In */}
          <a
            href="#"
            className="flex items-center font-PoppinsSemiBold hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span className="ml-4">Sign in</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
