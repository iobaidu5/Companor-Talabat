import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { PropagateLoader } from "react-spinners"
import Loading from './Loading';
import Slider from "react-slick";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const cachedCategories = localStorage.getItem('categories');

      if (cachedCategories) {
        setLoading(false);
        setCategories(JSON.parse(cachedCategories));
      } else {
        try {
          setLoading(true);
          const response = await axios.get('/api/all-categories');
          const fetchedCategories = response.data.categories || [];
          setCategories(fetchedCategories);
          localStorage.setItem('categories', JSON.stringify(fetchedCategories));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    router.push(`/food-details?category=${encodeURIComponent(category)}`)
  };

  const images = [
    { image: "/1.png" },
    { image: "/2.png" },
    { image: "/3.png" },
    { image: "/4.png" },
    { image: "/5.png" },
    { image: "/6.png" },
    { image: "/7.png" },
    { image: "/8.png" },
    { image: "/1.png" },
    { image: "/2.png" },
    { image: "/3.png" },
    { image: "/4.png" },
    { image: "/5.png" },
    { image: "/6.png" },
    { image: "/7.png" },
    { image: "/8.png" },
    { image: "/2.png" },
    { image: "/3.png" },
    { image: "/4.png" },
    { image: "/5.png" },
    { image: "/6.png" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <>
      {loading && <Loading />}
      <div className="mx-auto p-4">
        <h2 className="text-2xl font-bold text-left mb-6 text-gray-800">
          Explore Categories
        </h2>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-2"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="rounded-lg shadow-md bg-white hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
                <img
                  src={images[index]?.image}
                  alt={category}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-gray-700">{category}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Categories;
