import React, {useState} from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlistSlice";
import { addToCart, removeFromCart } from "../reducers/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ food }) => {
  function formatCityName(city) {
    if (!city) return '';
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const [isHovered, setIsHovered] = useState(false);
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
      position: "absolute",
      top: "10px",  
      right: "10px",   
      display: "flex",  
      gap: "10px",
    },
    iconButton: {
      border: "1px solid #ccc",
      borderRadius: "50%", 
      background: "transparent",
      fontSize: "20px",
      color: "#eee", 
      cursor: "pointer",
      padding: "8px",
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
    <Link href={`/${food._id}?category=${food.category}`} passHref>
      <div className="border border-gray-200 rounded-lg shadow-md flex overflow-hidden w-full cursor-pointer relative">
        <div className="h-56 w-2/5">
          <img
            src={food.image}
            alt={food.itemName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-3/5 p-4 flex flex-col justify-between relative">
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
  
          {/* Title and Category */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-PoppinsSemiBold">{food.itemName}</h3>
              <p className="text-gray-500 text-sm">👨🏻‍🍳 {formatCityName(food.restaurant)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm text-center">{food.category}</p>
            </div>
            <div></div>
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
              <div className="bg-green-300 text-white font-semibold text-sm rounded-md px-3 py-1">
                {food?.info[0] && food.info[0].icon && food.info[0]?.icon !== "none" ? food.info[0].icon : "☺️"}
              </div>
              <div>
                <p className="text-gray-900 text-sm">{food?.info[0]?.rating || "Very Good"}</p>
                <p className="text-gray-500 text-sm">{food.reviews}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-900 text-sm mt-4">{food?.info[0]?.cuisines || "Cuisines"}</p>
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
