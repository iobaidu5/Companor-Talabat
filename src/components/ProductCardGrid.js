import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlistSlice";
import { addToCart, removeFromCart } from "../reducers/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ProductCardGrid = ({ food }) => {
  function formatCityName(city) {
    if (!city) return '';
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);

  const isInWishlist = wishlist.some((item) => item._id === food._id);
  const isInCart = cart.some((item) => item._id === food._id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(food));
    } else {
      dispatch(addToWishlist(food));
    }
  };

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(food));
    } else {
      dispatch(addToCart(food));
    }
  };
  const styles = {
    tile: {
      border: "1px solid #ccc",
      padding: "20px",
      margin: "10px",
      borderRadius: "8px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    icons: {
      display: "flex",
      gap: "10px",
    },
    iconButton: {
      border: "1px solid #ccc",
      borderRadius: "50%",
      background: "transparent",
      fontSize: "14px",
      color: "#eee",
      cursor: "pointer",
      padding: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "border-color 0.3s, color 0.3s",
    },
    activeWishlistButton: {
      border: "1px solid red",
      color: "red",
    },
    activeCartButton: {
      border: "1px solid #FF5A00",
      color: "#FF5A00",
    },
  };


  return (
    <Link
      href={`${food.restaurants[0].link}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden w-full cursor-pointer h-full relative">
        {/* Image Section */}
        <div className="h-56 w-full">
          <img
            src={food.image}
            alt={food.itemName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col space-y-2 relative">
          {/* Title and Category */}
          <div className="flex justify-between g-2 w-100">
            <div>
              <h3 className="text-lg font-PoppinsSemiBold">{food.itemName}</h3>
              <p className="text-gray-500 text-sm">👨🏻‍🍳 {formatCityName(food.restaurant)}</p>
            </div>
            <div className="">
              <p className="text-gray-500 text-sm whitespace-nowrap">{food.category}</p>
            </div>
            <div>
            <div style={styles.icons}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistClick();
              }}
              style={{
                ...styles.iconButton,
                ...(isInWishlist ? styles.activeWishlistButton : {}),
              }}
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCartClick();
              }}
              style={{
                ...styles.iconButton,
                ...(isInCart ? styles.activeCartButton : {}),
              }}
              title={isInCart ? "Remove from Cart" : "Add to Cart"}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
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
                {food?.info[0]?.icon != "none" ? food?.info[0]?.icon : "☺️"}
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
