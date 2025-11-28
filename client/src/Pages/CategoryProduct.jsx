import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { FaShoppingCart, FaBalanceScale } from "react-icons/fa";
import Searchbar from "../Components/Searchbar";
import EmptyState from "../Components/Reusable/EmptyState";

const CategoryProduct = () => {
  const data = useLoaderData();
  const [productData, setProductData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");

  console.log(data);
  const { name } = useParams();
  return (
    <div className="bg-gray-50  pt-12 pb-20">
      <div className=" max-w-6xl mx-auto px-4 ">
      <Searchbar sortOption={sortOption} setSortOption={setSortOption} searchTerm={searchTerm} setSearchTerm={setSearchTerm} productData={productData} setProductData={setProductData} data={data} />
      <h1 className="text-3xl font-bold text-center my-6">{name}</h1>

      {
        productData && productData.length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">

        {productData.map((item) => (
        <div key={item._id} className="max-w-3xl w-90  sm:w-64 bg-white rounded-lg shadow-md overflow-hidden  hover:shadow-xl transition-shadow mx-auto">
      {/* Save Badge */}
      <div className="absolute mt-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-r-lg">
        Save: 2$
      </div>

      {/* Product Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-56 object-contain p-4"
      />

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-gray-800 text-lg">
          {item.name}
        </h2>

        <ul className="text-sm text-gray-600 space-y-1">
          <li className="">• {item.description}</li>
          <li>• Category : <span className="font-semibold">{item.category}</span>   </li>
          <li>• Seller : <span className="font-semibold">{item.seller.name}</span></li>
        </ul>

        {/* Price Section */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-red-600 font-bold text-xl">{item.price}$</span>
          
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <Link to={`/product/${item._id}`} className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2 rounded-md hover:bg-green-700 transition">
            <FaShoppingCart /> Buy Now
          </Link>
          
        </div>
      </div>
    </div>
      ))}


      </div>
        :
         <div className="-mt-40">
          <EmptyState message={`Sorry , There no ${name} available now`} />
         </div>

      }
      

      
    </div>
    </div>
  );
};

export default CategoryProduct;
