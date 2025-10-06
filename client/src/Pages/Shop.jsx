import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ShopProductCard from "../Components/ShopProductCard";
import EmptyState from "../Components/Reusable/EmptyState";
import Searchbar from "../Components/Searchbar";

const Shop = () => {
  const data = useLoaderData();
  const [productData, setProductData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  console.log(sortOption);
   
  return (
    <div className="py-14 w-11/12 md:w-10/12 mx-auto">
        <Searchbar sortOption={sortOption} setSortOption={setSortOption} searchTerm={searchTerm} setSearchTerm={setSearchTerm} productData={productData} setProductData={setProductData} data={data} />
    {
        productData && productData.length>0 ?
         <div >
        <h1 className="text-4xl text-center font-semibold my-5 ">
            Available Products
        </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
        {productData.map((product) => (
          <ShopProductCard
            key={product._id}
            item={product}
          ></ShopProductCard>
        ))}
      </div>
    </div>
    :
    <EmptyState message="No products available"  />
    }
    </div>
  );
};

export default Shop;
