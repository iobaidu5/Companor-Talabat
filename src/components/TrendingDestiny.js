"use client"
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from 'axios';
import { useRouter } from 'next/router';

const trendingDestinations = [
  { country: "France", city: "Paris", image: "/1.png" },
  { country: "Switzerland", city: "Zurich", image: "/2.png" },
  { country: "Japan", city: "Kyoto", image: "/3.png" },
  { country: "United States", city: "Austin", image: "/4.png" },
  { country: "Iceland", city: "Reykjavik", image: "/5.png" },
  { country: "Canada", city: "Vancouver", image: "/6.png" },
  { country: "Costa Rica", city: "San Jose", image: "/7.png" },
  { country: "United Kingdom", city: "Edinburgh", image: "/8.png" },
  { country: "Japan", city: "Kyoto", image: "/3.png" },
  { country: "United States", city: "Austin", image: "/4.png" },
  { country: "Iceland", city: "Reykjavik", image: "/5.png" },
  { country: "Canada", city: "Vancouver", image: "/6.png" },
];

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

const TrendingDestiny = () => {

  const [cities, setCities] = useState([]);
  const router = useRouter();
  const [images, setImages] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
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


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/location-categories');
        setCities(response.data.cities);

        console.log("categories ---> ", response.data.categories)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchUnsplashImages = async (cityName) => {
    const query = `${cityName}, Kuwait`; // More specific query for Kuwaiti cities
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query,
          per_page: 1,
          orientation: "landscape",
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      }
    );
    return response.data.results[0]?.urls?.regular || "";
  };

  const fetchImages = async () => {
    const localImages = JSON.parse(localStorage.getItem("cityImages")) || {};
    const updatedImages = { ...localImages };

    const fetchedImages = await Promise.all(
      cities.map(async (city) => {
        if (localImages[city.cityName]) {
          return localImages[city.cityName];
        } else {
          const image = await fetchUnsplashImages(city.cityName);
          updatedImages[city.cityName] = image; // Store new image in local object
          return image;
        }
      })
    );

    setImages(fetchedImages);

    // Save updated images to localStorage
    localStorage.setItem("cityImages", JSON.stringify(updatedImages));
  };

  useEffect(() => {
    fetchImages();
  }, [cities]);



  const handleCityClick = (cityId) => {
    router.push(`/food-details?foodByCity=${cityId}`);
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Discover our trending foods around you</h2>
      <Slider {...settings}>
      {cities.map((city, index) => (
        <div key={index} className="p-2" onClick={handleCityClick}>
          <div className="rounded-lg overflow-hidden border bg-white shadow-md">
            <img
              src={trendingDestinations[index].image} // Use fetched image
              alt={`${city.cityName} - ${city.country}`}
              className="h-72 w-full object-cover"
              onClick={() => console.log("City clicked:", city._id)}
            />
            <div className="p-2">
              <p className="font-bold text-[1.2rem]">{city.cityName}</p>
              <p>{city.country}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    </section>
  );
};

export default TrendingDestiny;
