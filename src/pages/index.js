// pages/index.js

import BeachPackageCard from "@/components/BeachPakageCard";
import EarnCard from "@/components/EarnCard";
import FavoriteStaySlider from "@/components/FavouriteStaySlider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import Tips from "@/components/Tips";
import TrendingDestiny from "@/components/TrendingDestiny";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container-fluid section p-6">
        <SearchForm />
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
