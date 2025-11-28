import React from "react";
import { useLoaderData } from "react-router";
import Categories from "../Components/Categories";
import HowWorks from "../Components/HowWorks";
import ServiceSection from "../Components/ServiceSection";
import HowItWorks from "../Components/HowItWorks";
import FeaturedProducts from "../Components/FeaturedProducts";
import Banner from "../Components/Banner";

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="">
      <Banner></Banner>
      <Categories data={data}></Categories>
      <ServiceSection></ServiceSection>
      <FeaturedProducts></FeaturedProducts>
      <HowItWorks></HowItWorks>
      {/* <HowWorks></HowWorks> */}
    </div>
  );
};

export default Home;
