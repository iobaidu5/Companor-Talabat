// pages/index.js

import BeachPackageCard from "@/components/BeachPakageCard";
import Categories from "@/components/Categories";
import EarnCard from "@/components/EarnCard";
import FavoriteStaySlider from "@/components/FavouriteStaySlider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import Tips from "@/components/Tips";
import TrendingDestiny from "@/components/TrendingDestiny";

export default function Home() {
  
  return (
    <>
      <Navbar />
      {/* <Header /> */}
      <main className="container-fluid section px-6">
        <SearchForm />
        <Categories />
        <EarnCard />
        <FavoriteStaySlider />
        <BeachPackageCard />
        <TrendingDestiny />
        <Tips />
      </main>
      <Footer />
    </>
  );
}
