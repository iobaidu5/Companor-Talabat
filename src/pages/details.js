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

export default function Details() {
  return (
    <>
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
              <button className="flex items-center space-x-2 text-gray-600">
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
              <button className="flex items-center space-x-2 text-gray-600">
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
            <div className="col-span-2 bg-gray-200 h-64"></div>
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <div className="bg-gray-200 h-32"></div>
              <div className="bg-gray-200 h-32"></div>
              <div className="bg-gray-200 h-32"></div>
              <div className="bg-gray-200 h-32"></div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex space-x-8 border-b pb-2">
            {[
              "Overview",
              "Amenities",
              "Rooms",
              "Accessibility",
              "Policies",
            ].map((tab) => (
              <button
                key={tab}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">
              Boulders Resort & Spa Scottsdale, Curio Collection by Hilton
            </h1>
            <p className="text-gray-600 text-sm">
              Luxury Scottsdale hotel in Pinnacle Peak with 5 restaurants
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white px-2 py-1 rounded-md text-sm">
                8.8
              </div>
              <p className="text-gray-900 font-medium">Excellent</p>
            </div>
            <p className="text-gray-600 text-sm">
              Guests liked: Friendly staff, spacious rooms, property condition
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium">
              See all 1,001 reviews
            </a>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Popular amenities</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Spa", icon: SpaIcon },
                { name: "Pool", icon: PoolIcon },
                { name: "Bar", icon: BarIcon },
                { name: "Hot Tub", icon: HotTubIcon },
                { name: "Parking available", icon: ParkingIcon },
                { name: "Room service", icon: RoomServiceIcon },
              ].map((amenity) => (
                <div key={amenity.name} className="flex items-center space-x-2">
                  <amenity.icon />
                  <span className="text-gray-600 text-sm">{amenity.name}</span>
                </div>
              ))}
            </div>
            <a href="#" className="text-blue-600 text-sm font-medium">
              See all property amenities
            </a>
          </div>

          {/* Explore Section */}
          <div className="flex justify-between">
            <div className="text-sm space-y-2">
              <h3 className="font-medium">Explore the area</h3>
              <div className="space-y-2">
                {[
                  "Boulders Golf Club - 8 min walk",
                  "Carefree Desert Gardens and Sundial - 4 min drive",
                  "Black Mountain Trail - 8 min drive",
                  "Phoenix, AZ (PHX-Sky Harbor Intl.) - 42 min drive",
                ].map((item, index) => (
                  <p key={index} className="text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
              <a href="#" className="text-blue-600 text-sm font-medium">
                See more about this area
              </a>
            </div>
            <div className="w-48 bg-gray-200 h-48 rounded-md"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold">Boulders Resort & Spa Scottsdale</h1>
        <Accessibility />
        <CheckInCheckOut />
        <Policies />
        <ImportantInformation />
        <FAQs />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
// SVG Icon Components
const SpaIcon = () => (
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PoolIcon = () => (
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
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
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
    <path d="M6 18l12-12M6 6h12v12H6z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const HotTubIcon = () => (
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ParkingIcon = () => (
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
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
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
