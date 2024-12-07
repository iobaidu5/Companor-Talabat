import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Wait for 500ms after the user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery === '') return;

    const fetchFoodItems = async () => {
      try {

        console.log("debouncedSearchQuery --> ", debouncedSearchQuery)
        router.push(
          `/food-details?searchedFood=${debouncedSearchQuery}`
        );

        return
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [debouncedSearchQuery]);

  return (
    <nav className="bg-white shadow-md font-PoppinsSemiBold">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <div>
          <Link href="/">
            <img src="./companor-logo.png" alt="Logo" className="rounded-xl w-24" />
          </Link>
        </div>

        {/* Center - Search Bar */}
        <div className="flex flex-1 mx-4 justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for food items..."
          className="w-full max-w-lg h-12 p-3 text-sm border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />

        </div>

        {/* Right - Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
