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
import AdBanner from "@/components/AdBanner";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

// export const products = [
//   {
//     id: 1,
//     name: "Margherita Pizza",
//     category: "Italian",
//     ingredients: ["Mozzarella", "Tomato Sauce", "Basil"],
//     location: "Naples, Italy",
//     description:
//       "A classic Italian pizza made with a simple and delicious combination of mozzarella, fresh tomato sauce, and fragrant basil leaves.",
//     image: "/images/1.png",
//     price: "12",
//   },
//   {
//     id: 2,
//     name: "Sushi Platter",
//     category: "Japanese",
//     ingredients: ["Rice", "Raw Fish", "Seaweed", "Vegetables"],
//     location: "Tokyo, Japan",
//     description:
//       "An assortment of fresh sushi rolls made with premium-quality fish, perfectly seasoned rice, and a variety of fresh vegetables.",
//     image: "/images/2.png",
//     price: "25",
//   },
//   {
//     id: 3,
//     name: "Tacos Al Pastor",
//     category: "Mexican",
//     ingredients: ["Marinated Pork", "Pineapple", "Corn Tortilla"],
//     location: "Mexico City, Mexico",
//     description:
//       "A delicious and flavorful Mexican dish made with marinated pork, pineapple, and served on soft corn tortillas.",
//     image: "/images/3.png",
//     price: "8",
//   },
//   {
//     id: 4,
//     name: "Butter Chicken",
//     category: "Indian",
//     ingredients: ["Chicken", "Butter", "Tomato Gravy", "Spices"],
//     location: "Delhi, India",
//     description:
//       "A rich and creamy Indian curry made with tender chicken cooked in a flavorful tomato-based gravy with aromatic spices.",
//     image: "/images/4.png",
//     price: "15",
//   },
//   {
//     id: 5,
//     name: "French Croissant",
//     category: "French",
//     ingredients: ["Flour", "Butter", "Yeast"],
//     location: "Paris, France",
//     description:
//       "A buttery and flaky French pastry, perfectly golden and deliciously light, ideal for breakfast or a snack.",
//     image: "/images/5.png",
//     price: "5",
//   },
// ];

const FoodDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [isAnimating, setIsAnimating] = useState({});
  const [direction, setDirection] = useState({});
  const [filters, setFilters] = useState({
    category: "",
    city: "",
    restaurant: "",
    priceRange: "",
    topPicks: false,
  });
  const [filteredItems, setFilteredItems] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState({});


  const router = useRouter();
  const { cityId, restaurantId, category, foodByCity, searchedFood, filter, foodByCityName } = router.query;



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
    }, 400);
  };


  const updateFilters = () => {
    try {
      console.log("Updating filters:", filters);
  
      setAppliedFilter({
        category: filters.category || "",
        city: filters.city || "",
        restaurant: filters.restaurant || "",
      });
  
      fetchFilteredFoodItems(); // Reapply filters
    } catch (error) {
      console.error("Error updating filters:", error);
    }
  };
  

  // Listen for route/query changes
  useEffect(() => {
    if(filters)
    updateFilters();
  }, [filters]);

  const fetchImage = async (link, itemName) => {
    try {
      const response = fetch(
        `/api/scrape-image?link=${link}&itemName=${itemName}`
      )
        .then((res) => res.json())
        .then((data) => setFoodItems(data.foodItems));

      // const response = await axios.get('/api/scrape-image', {
      //   params: { link, itemName },
      // });
      // return response.data.imageSrc;
    } catch (error) {
      return "/assets/images/img-placeholder.svg";
    }
  };

  useEffect(() => {

    if (cityId && restaurantId) {
      const fetchFoodItems = async () => {
        try {
          const response = await axios.get(`/api/fooditems?cityId=${cityId}&restaurantId=${restaurantId}`, {
            params: {
              page: currentPage,
              limit: itemsPerPage,
            },
          });

          setFoodItems(response.data.foodItems);
          setFilteredItems(response.data.foodItems);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching food items:", error);
          setLoading(false);
        }
      };

      fetchFoodItems();
    }

  }, [cityId, restaurantId, currentPage]);

  useEffect(() => {
    if (category) {
      const fetchFoodItems = async () => {
        try {
          const response = await axios.get("/api/food-by-category", {
            params: { category },
          });
          setFoodItems(response.data.foodItems);
          setFilteredItems(response.data.foodItems);
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
    if (searchedFood) {
      const fetchFoodItems = async () => {
        try {
          const response = await axios.get("/api/search-food-items", {
            params: {
              query: searchedFood,
              page: currentPage,
              limit: itemsPerPage,
            },
          });

          setFoodItems(response.data.foodItems);
          setFilteredItems(response.data.foodItems);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching food items:", error);
          setLoading(false);
        }
      };

      fetchFoodItems();
    }
  }, [searchedFood]);

  useEffect(() => {
    if (appliedFilter) {
      console.log("Current Filter:", appliedFilter);

      const filteredData = filteredItems.filter((item) => {
        let isMatch = true;

        if (appliedFilter.category && item.category !== appliedFilter.category) {
          isMatch = false;
        }

        if (appliedFilter.city && item.city && item.city.$oid !== appliedFilter.city) {
          isMatch = false;
        }

        if (
          appliedFilter.restaurant &&
          !item.restaurants.some(
            (restaurant) =>
              restaurant.restaurantId.$oid === appliedFilter.restaurant
          )
        ) {
          isMatch = false;
        }

        return isMatch;
      });

      setFilteredItems(filteredData);
    }
  }, [appliedFilter]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        if (foodByCityName) {
          const response = await axios.get("/api/food-items-by-city", {
            params: { cityName: foodByCityName, page: currentPage, limit: itemsPerPage },
          });
          setFoodItems(response.data.foodItems);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } else {
          const response = await axios.get("/api/food-items-by-city", {
            params: { foodByCity, page: currentPage, limit: itemsPerPage },
          });
          setFoodItems(response.data.foodItems);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
        setLoading(false);
      }
    };

    if (foodByCity || foodByCityName) {
      fetchFoodItems();
    }
  }, [foodByCity, currentPage, foodByCityName]);


  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("/api/food-items-by-cityname", {
          params: { cityName: foodByCityName, page: currentPage, limit: itemsPerPage },
        });
        setFoodItems(response.data.foodItems);
        setFilteredItems(response.data.foodItems);
        setTotalPages(response.data.totalPages);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching food items:", error);
        setLoading(false);
      }
    };

    if (foodByCityName) {
      fetchFoodItems();
    }
  }, [currentPage, foodByCityName]);

  const handlePageChange = (page) => {
    console.log("page ", page)
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


  const fetchFilteredFoodItems = () => {
    setLoading(true);
  
    const filteredItemsss = foodItems.filter((item) => {
      let matchesCategory = true;
      let matchesCity = true;
      let matchesRestaurant = true;
  
      // Apply category filter if selected
      if (filters.category) {
        matchesCategory = item.category === filters.category;
      }
  
      // Apply city filter if selected
      if (filters.city) {
        matchesCity = item.city.name === filters.city;
      }
  
      // Apply restaurant filter if selected
      if (filters.restaurant) {
        matchesRestaurant = item.restaurants.some(
          (restaurant) => restaurant.restaurantTitle === filters.restaurant
        );
      }
  
      // Include item only if it matches all selected filters
      return matchesCategory && matchesCity && matchesRestaurant;
    });
  
    console.log("Filtered items ->", filteredItemsss);
    setFilteredItems(filteredItemsss);
    setLoading(false);
  };
  


  useEffect(() => {
    if (filters) {
      fetchFilteredFoodItems();
    }
  }, [filters, foodItems]); // Ensure foodItems dependency is included
  


  return (
    <>
      <Navbar />
      <main className="container-fluid section p-6">
        <SearchForm />
        <div className="flex mt-4">
          <div className="w-[20%]">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          {loading ? <Loading /> : <div className="w-[70%] mx-4 relative">
            <div className="bg-gray-200 mb-3">
              <AdBanner
                dataAdSlot="3228536862"
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="text-center text-gray-500 font-medium">Loading...</div> // Show loading while fetching data
              ) : filteredItems.length > 0 ? (
                filteredItems.map((food, index) => (
                  <ProductCard key={index} food={food} />
                ))
              ) : (
                <div className="text-center text-gray-500 font-medium">No Item Found</div>
              )}
            </div>


            <div className="flex justify-center items-center space-x-2 mt-6">
              {pageGroupStart > 1 && (
                <button
                  onClick={goToPreviousGroup}
                  className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-blue-100 text-gray-700 font-medium"
                >
                  &lt;
                </button>
              )}

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
                ${page === currentPage
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
          </div>}
          <div className="w-[10%] bg-gray-200 relative mt-2">
            <AdBanner
              dataAdSlot="2953204693"
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
            />
            {/* <img src="/ad2.png" className="mt-12 sticky top-4" /> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FoodDetails;
