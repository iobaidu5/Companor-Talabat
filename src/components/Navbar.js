import HamburgerMenu from "./HamburgerMenu";
import Image from "next/image";
import NavCard from "./NavCard";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
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
    <nav className="bg-white shadow-md p-4 px-4 lg:px-44 md:px-10 sm:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-12">
            <Link href="/">
              <Image
                src="/companor-logo.png"
                alt="logo"
                width={40}
                height={40}
                className="rounded-xl w-24"
              />
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-grow max-w-lg w-1/2 mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for food items..."
                className="w-full h-12 p-3 text-sm border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Right - Menu Links and Profile */}
          <div className="flex items-center space-x-6">
            <Link
              href="/restaurants"
              className="text-gray-600 hover:text-primary-indigo-hover font-bold text-lg font-nunito hidden lg:block"
            >
              Restaurants
            </Link>
            <Link
              href="/deals"
              className="text-gray-600 hover:text-primary-indigo-hover font-bold text-lg font-nunito hidden lg:block"
            >
              Deals
            </Link>
            <div className="bg-light-gray w-[2px] h-10" />
            <Link
              href="/orders"
              className="text-gray-600 hover:text-primary-indigo-hover font-bold text-lg font-nunito hidden lg:block"
            >
              My orders
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative">
                <NavCard className="bg-light-indigo hover:ring-2 hover:ring-primary-indigo-hover ">
                  <FiShoppingBag className="text-xl text-primary-indigo" />
                </NavCard>
                <div className="absolute rounded-lg top-[-6px] right-[-6px] bg-primary-indigo text-white h-5 w-5 flex items-center justify-center text-xs">
                  4
                </div>
              </div>
            </Link>
            <Link href="/profile">
              <NavCard className="ring-2 ring-light-gray flex justify-center items-center ring-offset-2 overflow-hidden hover:ring-2 hover:ring-primary-indigo-hover">
                <Image
                  src={"/user.png"}
                  alt={"Profile Picture"}
                  height={200}
                  width={200}
                  style={{ objectFit: "cover" }}
                />
              </NavCard>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-white bg-customOrange rounded-lg hover:bg-customOrange-600">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 text-sm font-medium text-blue-500 border border-customOrange rounded-lg text-customOrange hover:bg-customOrange-100">
                  Signup
                </button>
              </Link>
            </div>
            <div className="block lg:hidden">
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
