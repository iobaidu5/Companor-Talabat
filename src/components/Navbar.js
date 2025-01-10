import HamburgerMenu from "./HamburgerMenu";
import Image from "next/image";
import NavCard from "./NavCard";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../reducers/wishlistSlice';
import { removeFromCart } from '../reducers/cartSlice'; 

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const wishlist = useSelector((state) => state.wishlist || []);
  const cartItems = useSelector((state) => state.cart || []);

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleCartDropdown = () => {
    setIsCartOpen((prev) => !prev); 
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
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
    }, 500); 

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
    <nav className="shadow-md p-4 px-0 lg:px-14 md:px-10 sm:px-8">
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
            <div className="relative">
            <div className="relative">
      {/* Trigger for Dropdown */}
      <button
        onClick={toggleDropdown}
        className="text-gray-600 hover:text-customOrange font-bold text-lg font-nunito hidden lg:block"
      >
        Wishlist
      </button>
    </div>

    {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 z-10">
          <div className="py-2 px-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-lg">Wishlisted Products</h3>
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="font-bold text-xl">&times;</span> {/* Cross icon */}
            </button>
          </div>

          {wishlist.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {wishlist.map((item) => (
                <li key={item._id} className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.itemName}</p>
                      <p className="text-xs text-gray-500">{item.restaurants[0].price}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(item._id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <span className="font-bold text-xl">&times;</span> {/* Cross icon */}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-2 px-4 text-gray-600">No items in wishlist</div>
          )}
        </div>
      )}
    </div>

            {/* Cart */}
            <div className="relative">
      {/* Trigger for Cart Dropdown */}
      <div
        onClick={toggleCartDropdown}
        className="relative cursor-pointer"
      >
        <NavCard className="bg-light-indigo hover:ring-2 hover:ring-primary-indigo-hover">
          <FiShoppingBag className="text-xl text-primary-indigo" />
        </NavCard>
        {/* Cart item count badge */}
        <div className="absolute rounded-lg top-[-6px] right-[-6px] bg-primary-indigo text-white h-5 w-5 flex items-center justify-center text-xs">
          {cartItems.length}
        </div>
      </div>

      {/* Cart Dropdown Content */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 z-10">
          <div className="py-2 px-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-lg">Cart Items</h3>
            {/* Close button */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="font-bold text-xl">&times;</span> {/* Cross icon */}
            </button>
          </div>

          {cartItems.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <li key={item._id} className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.itemName}</p>
                      <p className="text-xs text-gray-500">{item.restaurants[0].price}</p>
                    </div>
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRemoveFromCart(item._id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <span className="font-bold text-xl">&times;</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-2 px-4 text-gray-600">No items in cart</div>
          )}
        </div>
      )}
    </div>
            <Link href="/profile">
              <NavCard className="flex justify-center items-center ring-offset-2 overflow-hidden hover:customOrange hover:customOrange">
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
