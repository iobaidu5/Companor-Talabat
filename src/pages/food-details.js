import EarnCard from "@/components/EarnCard";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import React, { useState, useEffect, act } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import axios from "axios";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    discount: "41%",
    image: "/images/1.png",
    store: "US Store",
    brand: "Pfaltzgraff",
    title: "Pfaltzgraff Pistoulet Red 16 Piece Dinnerware Set, Service",
    price: "PKR 42330",
    originalPrice: "71310",
  },
  {
    discount: "30%",
    image: "/images/2.png",
    store: "US Store",
    brand: "Corelle",
    title: "Corelle Livingware 18 Piece Dinnerware Set, Service",
    price: "PKR 25000",
    originalPrice: "35714",
  },
  {
    discount: "20%",
    image: "/images/3.png",
    store: "US Store",
    brand: "Gibson",
    title: "Gibson Home Rockaway 12 Piece Dinnerware Set",
    price: "PKR 15000",
    originalPrice: "18750",
  },
  {
    discount: "25%",
    image: "/images/4.png",
    store: "US Store",
    brand: "Lenox",
    title: "Lenox French Perle 16 Piece Dinnerware Set",
    price: "PKR 32000",
    originalPrice: "42667",
  },
  {
    discount: "35%",
    image: "/images/5.png",
    store: "US Store",
    brand: "Noritake",
    title: "Noritake Colorwave 16 Piece Dinnerware Set",
    price: "PKR 45000",
    originalPrice: "69231",
  },
  {
    discount: "15%",
    image: "/images/6.png",
    store: "US Store",
    brand: "Mikasa",
    title: "Mikasa Italian Countryside 20 Piece Dinnerware Set",
    price: "PKR 50000",
    originalPrice: "58824",
  },
  {
    discount: "22%",
    image: "/images/7.png",
    store: "US Store",
    brand: "Royal Doulton",
    title: "Royal Doulton Pacific 16 Piece Dinnerware Set",
    price: "PKR 33000",
    originalPrice: "42308",
  },
  {
    discount: "28%",
    image: "/images/8.png",
    store: "US Store",
    brand: "Villeroy & Boch",
    title: "Villeroy & Boch NewWave 16 Piece Dinnerware Set",
    price: "PKR 42000",
    originalPrice: "58333",
  },
  {
    discount: "18%",
    image: "/images/9.png",
    store: "US Store",
    brand: "Pfaltzgraff",
    title: "Pfaltzgraff Villa della Luna 16 Piece Dinnerware Set",
    price: "PKR 37000",
    originalPrice: "45122",
  },
  {
    discount: "45%",
    image: "/images/10.png",
    store: "US Store",
    brand: "Corelle",
    title: "Corelle Impressions 18 Piece Dinnerware Set",
    price: "PKR 30000",
    originalPrice: "54545",
  },
  {
    discount: "12%",
    image: "/images/1.png",
    store: "US Store",
    brand: "Gibson",
    title: "Gibson Elite Soho Lounge 16 Piece Dinnerware Set",
    price: "PKR 24000",
    originalPrice: "27273",
  },
  {
    discount: "38%",
    image: "/images/2.png",
    store: "US Store",
    brand: "Lenox",
    title: "Lenox Opal Innocence Carved 16 Piece Dinnerware Set",
    price: "PKR 28000",
    originalPrice: "45161",
  },
  {
    discount: "27%",
    image: "/images/3.png",
    store: "US Store",
    brand: "Noritake",
    title: "Noritake Crestwood Platinum 16 Piece Dinnerware Set",
    price: "PKR 43000",
    originalPrice: "58904",
  },
  {
    discount: "32%",
    image: "/images/4.png",
    store: "US Store",
    brand: "Mikasa",
    title: "Mikasa Delray 16 Piece Dinnerware Set",
    price: "PKR 31000",
    originalPrice: "45588",
  },
  {
    discount: "19%",
    image: "/images/5.png",
    store: "US Store",
    brand: "Royal Doulton",
    title: "Royal Doulton Gordon Ramsay Maze 16 Piece Dinnerware Set",
    price: "PKR 46000",
    originalPrice: "56790",
  },
  {
    discount: "24%",
    image: "/images/6.png",
    store: "US Store",
    brand: "Villeroy & Boch",
    title: "Villeroy & Boch Artesano 16 Piece Dinnerware Set",
    price: "PKR 39000",
    originalPrice: "51316",
  },
  {
    discount: "36%",
    image: "/images/7.png",
    store: "US Store",
    brand: "Pfaltzgraff",
    title: "Pfaltzgraff Heritage 16 Piece Dinnerware Set",
    price: "PKR 27000",
    originalPrice: "42188",
  },
  {
    discount: "29%",
    image: "/images/8.png",
    store: "US Store",
    brand: "Corelle",
    title: "Corelle Square 18 Piece Dinnerware Set",
    price: "PKR 26000",
    originalPrice: "36620",
  },
  {
    discount: "40%",
    image: "/images/9.png",
    store: "US Store",
    brand: "Gibson",
    title: "Gibson Elite Tequesta 16 Piece Dinnerware Set",
    price: "PKR 35000",
    originalPrice: "58333",
  },
  {
    discount: "34%",
    image: "/images/10.png",
    store: "US Store",
    brand: "Lenox",
    title: "Lenox Butterfly Meadow 16 Piece Dinnerware Set",
    price: "PKR 31000",
    originalPrice: "46970",
  },
];


const FoodDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [isAnimating, setIsAnimating] = useState({});
  const [direction, setDirection] = useState({});

  const router = useRouter();
  const { cityId, restaurantId, category, foodByCity } = router.query;

  console.log("router.query -> ", router.query);

  const [foodItems, setFoodItems] = useState([]);

  const [imageSrcs, setImageSrcs] = useState({});
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Same as the limit used in the API

  const paginationGroupSize = 4;
  const [pageGroupStart, setPageGroupStart] = useState(1);

  const handleNextImage = (id) => {
    setDirection((prev) => ({ ...prev, [id]: "next" }));
    animateImageChange(id, 1);
  };

  const handlePrevImage = (id) => {
    setDirection((prev) => ({ ...prev, [id]: "prev" }));
    animateImageChange(id, -1);
  };

  const animateImageChange = (id, step) => {
    setIsAnimating((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActiveImageIndex((prev) => {
        const images = hotelData.find((hotel) => hotel.id === id).images;
        const currentIndex = prev[id] !== undefined ? prev[id] : 0;
        const newIndex = (currentIndex + step + images.length) % images.length;
        return { ...prev, [id]: newIndex };
      });
      setIsAnimating((prev) => ({ ...prev, [id]: false }));
    }, 400); // Animation duration (300ms)
  };

  const fetchImage = async (link, itemName) => {
    console.log("getting image from api");
    try {
      const response = fetch(
        `/api/scrape-image?link=${link}&itemName=${itemName}`
      )
        .then((res) => res.json())
        .then((data) => setFoodItems(data.foodItems));

      console.log("res img -> ", response);

      // const response = await axios.get('/api/scrape-image', {
      //   params: { link, itemName },
      // });
      // return response.data.imageSrc;
    } catch (error) {
      console.error("Error fetching image:", error);
      return "/assets/images/img-placeholder.svg";
    }
  };

  useEffect(() => {
    if (cityId && restaurantId) {
      fetch(`/api/fooditems?cityId=${cityId}&restaurantId=${restaurantId}`)
        .then((res) => res.json())
        .then((data) => setFoodItems(data.foodItems));
    }
  }, [cityId, restaurantId]);

  useEffect(() => {
    if (category) {
      const fetchFoodItems = async () => {
        try {
          const response = await axios.get("/api/food-by-category", {
            params: { category },
          });
          setFoodItems(response.data.foodItems);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching food items by category:", error);
          setLoading(false);
        }
      };

      fetchFoodItems();
    }
  }, [category]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("/api/food-items-by-city", {
          params: { foodByCity, page: currentPage, limit: itemsPerPage },
        });
        setFoodItems(response.data.foodItems);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setLoading(false);
      }
    };

    if (foodByCity) {
      fetchFoodItems();
    }
  }, [foodByCity, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToNextGroup = () => {
    setPageGroupStart(
      Math.min(
        pageGroupStart + paginationGroupSize,
        totalPages - paginationGroupSize + 1
      )
    );
  };

  const goToPreviousGroup = () => {
    setPageGroupStart(Math.max(pageGroupStart - paginationGroupSize, 1));
  };

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true);

  //     const newImageSrcs = {};

  //     for (const hotel of foodItems) {
  //       let activeImage = hotel.image[activeImageIndex[hotel._id]] || hotel.image;

  //       if (activeImage === "/assets/images/img-placeholder.svg") {
  //         const imageSrc = await fetchImage(hotel.restaurants[0].link, hotel.itemName);
  //         newImageSrcs[hotel._id] = imageSrc;
  //       } else {
  //         newImageSrcs[hotel._id] = activeImage;
  //       }
  //     }

  //     setImageSrcs(newImageSrcs);
  //     setLoading(false);
  //   };

  //   fetchImages();
  // }, [foodItems, activeImageIndex]);

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading message while fetching images
  // }

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <SearchForm />
        <div className="flex mt-4">
          <div className="w-[20%]">
            <Filters />
          </div>
          <div className="w-[70%] mx-4 relative">
            {/* <div className="bg-[#1f254f] text-white p-4 rounded-lg flex justify-between items-center w-full mx-auto mt-8">
              <div className="flex items-center space-x-2">
                <img src="/flower.png" className="w-20" />
                <p className="font-bold">
                  You all always get our best prices when you are signed in!
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-[#0071eb] text-white font-semibold px-4 py-1 rounded-full">
                  Sign in
                </button>
              </div>
            </div> */}
            <img src="/addds.png" className="w-full mb-4 sticky top-0 z-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {foodItems.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            {/* <div>
              {foodItems.map((hotel)  => {
                var activeImage = hotel.image[activeImageIndex[hotel._id]] || hotel.image;
                const animationClasses = isAnimating[hotel._id]
                  ? direction[hotel._id] === 'next'
                    ? 'opacity-0 translate-x-10'
                    : 'opacity-0 -translate-x-10'
                  : 'opacity-100 translate-x-0';


                  return (
                    <Link key={hotel._id} href={hotel.restaurants[0].link}>
                      <div className="flex rounded-xl shadow-md overflow-hidden bg-white w-full p-4 mb-4">
                        <div className="relative w-1/3">
                          <img
                            src={activeImage}
                            alt="Hotel"
                            className={`object-cover w-full h-56 transition-all duration-300 transform ${animationClasses}`}
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-2">
                            <button
                              className="w-10 h-10 p-2 bg-gray-800 opacity-70 rounded-full"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePrevImage(hotel._id);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                              </svg>
                            </button>
                            <button
                              className="w-10 h-10 p-2 bg-gray-800 opacity-70 rounded-full"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNextImage(hotel._id);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="w-2/3 p-4 flex flex-col justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800">{hotel.itemName}</h2>
                            <p className="text-lg text-gray-500">{hotel.description}</p>
                            <p className="mt-2 text-lg text-green-600 font-semibold">{hotel.category}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                              <span className="bg-green-500 text-white text-sm font-bold rounded px-3 py-2">
                                {hotel.reviews[0] || '5.0'}
                              </span>
                              <p className="text-lg text-gray-700 font-semibold">{hotel.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-800">KWD {hotel.restaurants[0].price}</p>
                              <p className="text-sm text-gray-500">{hotel.totalPrice}</p>
                              <p className="text-sm text-gray-500">{hotel.restaurants[0].source}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
              })}
            </div> */}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              {/* Previous Button */}
              {pageGroupStart > 1 && (
                <button
                  onClick={goToPreviousGroup}
                  className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-blue-100 text-gray-700 font-medium"
                >
                  &lt;
                </button>
              )}

              {/* Page Buttons */}
              {Array.from({
                length: Math.min(
                  paginationGroupSize,
                  totalPages - pageGroupStart + 1
                ),
              }).map((_, index) => {
                const page = pageGroupStart + index;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors 
                ${
                  page === currentPage
                    ? "bg-blue-500 text-white cursor-default"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                    disabled={page === currentPage}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              {pageGroupStart + paginationGroupSize <= totalPages && (
                <button
                  onClick={goToNextGroup}
                  className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-blue-100 text-gray-700 font-medium"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
          <div className="w-[10%] relative">
            <img src="/ad1.png" />
            <img src="/ad2.png" className="mt-12 sticky top-4" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FoodDetails;
