// components/FavoriteStaySlider.js
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useRouter } from "next/router";
import AdBanner from "./AdBanner";

const favoriteStays = [
  { name: "Fish Fries", image: "/1.png" },
  { name: "Onion Rings", image: "/2.png" },
  { name: "Pizza", image: "/3.png" },
  { name: "Chat", image: "/4.png" },
  { name: "Fruits", image: "/5.png" },
  { name: "Steak", image: "/6.png" },
  { name: "Shake", image: "/7.png" },
  { name: "Burger", image: "/8.png" },
  { name: "Fish Fries", image: "/1.png" },
  { name: "Onion Rings", image: "/2.png" },
  { name: "Pizza", image: "/3.png" },
  { name: "Chat", image: "/4.png" },
  { name: "Fruits", image: "/5.png" },
  { name: "Steak", image: "/6.png" },
  { name: "Shake", image: "/7.png" },
  { name: "Burger", image: "/8.png" },
];

const FavoriteStaySlider = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.categories);

      console.log("categories ---> ", response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    router.push(`/food-details?category=${encodeURIComponent(category.title)}`);
  };
  // Custom arrow components for slick
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -right-4 w-10 h-10 top-1/2 transform -translate-y-1/2 p-2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full"
    >
      ▶
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -left-4 w-10 h-10 top-1/2 transform -translate-y-1/2 p-2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full"
    >
      ◀
    </button>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">
        Discover your new favorite foods
      </h2>
      <Slider {...settings}>
        {categories?.map((category, index) => (
          <div key={index} className="px-2">
            <div
              style={{
                backgroundImage: `url('${favoriteStays[index].image}')`,
              }}
              className="rounded-lg overflow-hidden shadow-md w-full h-96 bg-cover bg-center relative"
              onClick={() => handleCategoryClick(category)}
            >
              <p className="text-center font-bold text-[1.2rem] py-2 absolute bottom-0 left-0 ml-2 text-white">
                {category.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="bg-gray-200">
      <AdBanner
        dataAdSlot="1630442794"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
      />
      </div>
    </section>
  );
};

export default FavoriteStaySlider;
