import React from "react";
import { useLoaderData } from "react-router";
import ShopProductCard from "../Components/ShopProductCard";
import EmptyState from "../Components/Reusable/EmptyState";

const Shop = () => {
  const productData = useLoaderData();
  console.log(productData);
  return (
    <>
    {
        productData && productData.length>0 ?
         <div className="py-20">
        <h1 className="text-4xl text-center font-semibold my-5 ">
            Available Products
        </h1>
      <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4 justify-between">
        {productData.map((product) => (
          <ShopProductCard
            key={product._id}
            product={product}
          ></ShopProductCard>
        ))}
      </div>
    </div>
    :
    <EmptyState message="No products available"  />
    }
    </>
  );
};

export default Shop;
