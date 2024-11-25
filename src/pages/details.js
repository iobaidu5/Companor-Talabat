// pages/index.js

import BeachPackageCard from "@/components/BeachPakageCard";
import Accessibility from "@/components/Details/Accessibility";
import CheckInCheckOut from "@/components/Details/CheckInCheckOut";
import FAQs from "@/components/Details/FAQs";
import ImportantInformation from "@/components/Details/ImportantInformation";
import Policies from "@/components/Details/Policies";
import Reviews from "@/components/Details/Reviews";
import EarnCard from "@/components/EarnCard";
import FavoriteStaySlider from "@/components/FavouriteStaySlider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import Tips from "@/components/Tips";
import TrendingDestiny from "@/components/TrendingDestiny";
import { FaParking, FaMusic, FaWineBottle, FaChair } from "react-icons/fa";
import { MdOutlineOutdoorGrill, MdOutlineEventAvailable } from "react-icons/md";
import { GiChefToque, GiChariot } from "react-icons/gi";
import { BsStars } from "react-icons/bs";

export default function Details() {
  return (
    <div className="text-gray-800">
      <Header />
      <main className="container mx-auto p-6">
        <SearchForm />
        <div className="p-6 space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <a href="#" className="text-blue-600 text-sm font-medium">
              &lt; See all properties
            </a>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 ">
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
              <button className="flex items-center space-x-2 ">
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
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 bg-gray-200 h-[22.5rem]">
              <img src="/pasta2.png" className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <div className="bg-gray-200 h-44">
                <img src="/pasta1.png" className="w-full h-full object-cover" />
              </div>
              <div className="bg-gray-200 h-44">
                {" "}
                <img src="/pasta5.png" className="w-full h-full object-cover" />
              </div>
              <div className="bg-gray-200 h-44">
                {" "}
                <img src="/pasta3.png" className="w-full h-full object-cover" />
              </div>
              <div className="bg-gray-200 h-44">
                {" "}
                <img src="/pasta4.png" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          {/* <div className="flex space-x-8 border-b pb-2">
            {[
              "Overview",
              "Amenities",
              "Rooms",
              "Accessibility",
              "Policies",
            ].map((tab) => (
              <button
                key={tab}
                className=" hover:text-blue-600 text-sm font-medium"
              >
                {tab}
              </button>
            ))}
          </div> */}

          {/* Main Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">
              Boulders Resort & Spa Scottsdale, Curio Collection by Hilton
            </h1>
            <p className=" text-sm">
              Luxury Scottsdale hotel in Pinnacle Peak with 5 restaurants
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white px-2 py-1 rounded-md text-sm">
                8.8
              </div>
              <p className="text-gray-900 font-medium">Excellent</p>
            </div>
            <p className=" text-sm">
              Guests liked: Friendly staff, spacious rooms, property condition
            </p>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Popular food options</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Breakfast buffet", icon: "🥞" },
                { name: "Fine dining restaurant", icon: "🍴" },
                { name: "Room service", icon: "🛎️" },
                { name: "Poolside bar", icon: "🍹" },
                { name: "Coffee shop", icon: "☕" },
                { name: "Cocktail lounge", icon: "🍸" },
              ].map((foodOption) => (
                <div
                  key={foodOption.name}
                  className="flex items-center space-x-2"
                >
                  {/* <img src={foodOption.icon} /> */}
                  <span className=" text-sm font-PoppinsBold">
                    {foodOption.name}&nbsp;&nbsp;&nbsp;{foodOption.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Section */}
          <div className="flex justify-between">
            <div className="text-sm space-y-2">
              <h3 className="font-PoppinsBold">
                Explore nearby dining options
              </h3>
              <div className="space-y-2">
                {[
                  "The Italian Kitchen - 5 min walk",
                  "Sunset Grill - 10 min drive",
                  "Green Valley Vegan Bistro - 15 min drive",
                  "Downtown Food Court - 20 min drive",
                ].map((item, index) => (
                  <p key={index} className="">
                    {item}
                  </p>
                ))}
              </div>
              <a href="#" className="text-blue-600 text-sm font-medium">
                See more dining options nearby
              </a>
            </div>
            <div className="w-96 h-48 rounded-md flex items-center justify-center">
              {/* Placeholder for an image or map */}
              <img
                src="/map.png"
                className="rounded w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="w-full md:w-1/5">
            <h1 className="text-2xl font-bold text-gray-900">
              Add this to favorites
            </h1>
          </div>

          {/* Right Section */}
          <div className="p-6 pt-0 w-full md:w-4/5">
            <h1 className="text-3xl font-bold text-gray-900">
              The Gourmet Kitchen & Lounge
            </h1>
            <p className="text-gray-700 mb-6">
              Fine dining experience near downtown
            </p>
            <p className="text-gray-700 mb-6">
              Indulge in a world-class dining experience at The Gourmet Kitchen
              & Lounge, offering exquisite meals crafted with the freshest
              ingredients. Featuring a cozy lounge area, live music, and a
              selection of signature cocktails, this restaurant provides a
              perfect setting for any occasion. Enjoy breakfast, lunch, or
              dinner in a warm and inviting atmosphere, or take advantage of the
              outdoor patio for a unique dining experience. Savor dishes
              prepared by award-winning chefs, complemented by an extensive wine
              collection and exemplary service.
            </p>

            {/* Highlights */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Highlights you’ll enjoy at this restaurant:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <MdOutlineOutdoorGrill className="w-6 h-6 text-gray-800 mr-3" />
                Outdoor seating with scenic views
              </li>
              <li className="flex items-center text-gray-700">
                <BsStars className="w-6 h-6 text-gray-800 mr-3" />A diverse menu
                featuring vegan, vegetarian, and gluten-free options
              </li>
              <li className="flex items-center text-gray-700">
                <FaParking className="w-6 h-6 text-gray-800 mr-3" />
                On-site parking and valet service
              </li>
              <li className="flex items-center text-gray-700">
                <FaMusic className="w-6 h-6 text-gray-800 mr-3" />
                Live music on weekends and a private dining area for special
                events
              </li>
              <li className="flex items-center text-gray-700">
                <GiChefToque className="w-6 h-6 text-gray-800 mr-3" />
                Exceptional service and glowing reviews for the ambiance and
                food
              </li>
            </ul>

            {/* Dining Features */}
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Dining features
            </h2>
            <p className="text-gray-700 mb-4">
              All dishes are made with organic, locally sourced ingredients.
              Guests can enjoy seasonal specials, handcrafted cocktails, and
              decadent desserts. The restaurant’s interior is designed to
              provide a relaxed yet sophisticated environment.
            </p>

            {/* Additional Amenities */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional amenities include:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <MdOutlineEventAvailable className="w-6 h-6 text-gray-800 mr-3" />
                Private dining rooms for events and celebrations
              </li>
              <li className="flex items-center text-gray-700">
                <GiChariot className="w-6 h-6 text-gray-800 mr-3" />
                Kids menu and high chairs available
              </li>
              <li className="flex items-center text-gray-700">
                <FaChair className="w-6 h-6 text-gray-800 mr-3" />
                Open kitchen concept for an interactive dining experience
              </li>
              <li className="flex items-center text-gray-700">
                <FaWineBottle className="w-6 h-6 text-gray-800 mr-3" />
                Special discounts for group reservations and corporate events
              </li>
            </ul>

            <p className="text-gray-700 underline cursor-pointer mt-4">
              See less
            </p>

            {/* Languages */}
            <h2 className="text-xl font-semibold text-gray-900 mt-8">
              Languages
            </h2>
            <p className="text-gray-700">English, French, Spanish</p>
          </div>
        </div>

        <Accessibility />
        <FAQs />
        <Policies />
        {/* <CheckInCheckOut />
        <ImportantInformation />
        <Reviews /> */}
      </main>
      <Footer />
    </div>
  );
}
// SVG Icon Components
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
