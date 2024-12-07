import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { PropagateLoader } from "react-spinners"
import Loading from './Loading';
// PropagateLoader

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

  return (
    <>

      {loading && <Loading />}
      <div className="mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Explore Categories
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="min-w-[150px] flex-shrink-0 rounded-lg shadow-md bg-white hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={images[index]?.image}
                alt={category}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-3 text-center">
                <p className="text-sm font-medium text-gray-700">{category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
