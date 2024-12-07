import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { GoogleMap, Marker, useJsApiLoader, LoadScript, useLoadScript } from "@react-google-maps/api";
import Modal from "react-modal";
import { useCallback, useEffect, useState } from "react";
import { GOOGLE_MAP_API } from "../../config";
import { useRouter } from 'next/router';
import axios from "axios";
import ProductCardGrid from "@/components/ProductCardGrid";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function ProductDetails() {

  const router = useRouter();
  const { id, category } = router.query;
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState();
  const [coords, setCoords] = useState({
    lat: 29.3117,
    lng: 47.4818,
  });
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API,
    // libraries: ['geometry', 'drawing'],
  });


  function getAddressFromLatLong(lat, lng) {
    const apiKey = GOOGLE_MAP_API; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const address = data.results[0].formatted_address;
          return address;
        } else {
          throw new Error("Reverse geocoding failed: " + data.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });
  }
  const handleMapClick = useCallback(
    (event) => {
      const newCoords = { ...coords };
      console.log(event);
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(lat, lng);
      newCoords.lat = lat;
      newCoords.lng = lng;
      getAddressFromLatLong(lat, lng).then((res) => {
        setAddress(res);
      });
      setCoords(newCoords);
    },
    [coords, setCoords]
  );

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90vw",
      maxHeight: "80vh",
      overflow: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const closeCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAddressFromLatLong(coords.lat, coords.lng).then((res) => {
      console.log(res);
      setAddress(res);
    });
  }, []);


  function formatCityName(city) {
    if (!city) return '';
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {
    if (id) {
      const fetchFoodItems = async () => {
        try {
          setLoading(true)
          const response = await axios.get("/api/single-food", {
            params: { foodItemId: id },
          });
          setFoodItems(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching food items by category:", error);
          setLoading(false);
        }
      };

      fetchFoodItems();
    }
  }, [id]);


  useEffect(() => {
    if (category) {
      const fetchFoodItems = async () => {
        try {
          setLoadingCategories(true)
          const response = await axios.get("/api/food-by-category", {
            params: { category },
          });
          setFoodCategories(response.data.foodItems);
          console.log("catrgorhy foorrr", response.data.foodItems)
          setLoadingCategories(false);
        } catch (error) {
          console.error("Error fetching food items by category:", error);
          setLoadingCategories(false);
        }
      };

      fetchFoodItems();
    }
  }, [category]);




  return (
    <div className="text-gray-800">
      <Modal
        isOpen={open}
        contentLabel="Map Modal"
        ariaHideApp={false}
        style={{
          ...customStyles,
          content: {
            ...customStyles.content,
            width: "80vw",
          },
        }}
        onRequestClose={closeCancel}
      >
        <div className="w-full">
          <p className="font-PoppinsSemiBold text-2xl mb-3">{address}</p>
          <div>
            {/* {isLoaded && ( */}
            <GoogleMap
              mapContainerStyle={{
                height: "450px",
                width: "100%",
                borderRadius: "10px",
              }}
              zoom={10}
              center={coords}
              onClick={handleMapClick}
              options={{
                disableDefaultUI: true,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker position={coords} />
            </GoogleMap>
            {/* )} */}
          </div>
          <div className="flex w-full justify-end my-3">
            <button
              className="mt-3 border border-black rounded-lg p-2 px-5 text-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Navbar />
      <main className="container mx-auto p-6">
        <SearchForm />
        <div className="p-6 space-y-8">
          {/* Header Section */}
          {loading ? <Loading /> : <div className="flex justify-between items-center mb-2">
            <a
              href="#"
              className="text-customOrange text-sm font-medium flex items-center space-x-2 transition-all hover:text-customOrange hover:no-underline"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <span className="text-lg font-bold">&lt;</span>
              <span>See all Foods</span>
            </a>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-4"
                  />
                </svg>
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span>Save</span>
              </button>
            </div>
          </div>}

          {loading ? <Loading /> :
            <Link
              href={`${foodItems.restaurants[0].link}`}
              target="_blank"
              rel="noopener noreferrer"
            >

              <div className="flex flex-col md:flex-row gap-6 p-2 border border-gray-200 rounded-lg shadow-md cursor-pointer">
                <div className="md:w-1/2 h-[22.5rem]">
                  <img
                    src={foodItems.image}
                    className="h-full w-full object-cover rounded-lg"
                    alt={foodItems.itemName}
                  />
                </div>
                <div className="md:w-1/2 flex flex-col md:flex-row justify-between gap-6 relative">
                  <div className="flex flex-col py-5 justify-between w-full md:w-1/2">
                    <div>
                      <h1 className="text-3xl font-PoppinsBold" style={{ lineHeight: "1.4" }}>{foodItems.itemName}</h1>
                      <p className="text-sm mt-2">{foodItems.description}</p>
                      <div>
                        <p className="text-sm mt-2 text-left py-2">{foodItems.category}</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">
                        Label Minimum Order Amount: {foodItems?.info && foodItems?.info[0] ? foodItems?.info[0]?.labelMinimumOrderAmount : "0.00"}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm mt-2">
                        {foodItems?.info && foodItems?.info[0]?.cuisines || "Cuisines"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-300 text-white font-semibold text-sm rounded-md px-3 py-1">
                        {foodItems?.info && foodItems?.info[0]?.icon != "none" ? foodItems?.info[0]?.icon : "☺️"}
                      </div>
                      <p className="text-gray-900 font-medium">
                        {foodItems?.info && foodItems?.info[0] ? foodItems?.info[0]?.rating : "Very Good"}
                      </p>
                      <p className="text-gray-500 text-sm">{foodItems.reviews}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 h-80 right-0">
                    <div>
                      <p className="text-gray-600 text-sm text-right mb-3 mt-1">
                        <span className="mr-1">📍</span>
                        {formatCityName(foodItems.city)}
                      </p>
                      <div className="text-gray-900 font-medium">
                        Pre-Order {foodItems?.info && foodItems?.info[0] ? foodItems?.info[0]?.preOrder : "No"}
                      </div>
                    </div>
                    <div>
                      <div className=" absolute bottom-0" style={{ width: "49%" }}>
                        <h1 className="text-1xl font-PoppinsBold mb-5">Explore the area</h1>
                        {isLoaded && coords?.lat && coords?.lng ? (
                          <div className="h-full w-full rounded-lg overflow-hidden">
                            <GoogleMap
                              mapContainerStyle={{
                                height: "15rem",
                                width: "120%",
                              }}
                              zoom={10}
                              center={coords}
                              options={{
                                disableDefaultUI: true,
                                zoomControl: false,
                                mapTypeControl: false,
                                scaleControl: false,
                                streetViewControl: false,
                                rotateControl: false,
                                fullscreenControl: false,
                              }}
                            >
                              <Marker position={coords} />
                            </GoogleMap>
                          </div>
                        ) : (
                          <p>Loading map...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </Link>

          }


          <button
            className="flex justify-center w-100 ml-auto border border-green-500 text-green-700 rounded-lg p-2 px-5 text-sm"
            onClick={() => setOpen(true)}
          >
            View Full Map
          </button>

          <h2 className="text-2xl font-bold mb-4">
            Explore Your Menu
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {loadingCategories ? <Loading /> : foodCategories.slice(0, 6).map((food, index) => (
              <ProductCardGrid key={index} food={food} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
const SpaIcon = () => (
  <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PoolIcon = () => (
  <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const BarIcon = () => (
  <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none">
    <path d="M6 18l12-12M6 6h12v12H6z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const HotTubIcon = () => (
  <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ParkingIcon = () => (
  <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none">
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const RoomServiceIcon = () => (
  <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
