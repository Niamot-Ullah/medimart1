import React, { useEffect, useState } from "react";

const Searchbar = ({
  searchTerm,
  setSearchTerm,
  productData,
  setProductData,
  data,
  sortOption,
  setSortOption,
}) => {
  useEffect(() => {
    //  let sortData = [...productData]
    //     if(sortOption === 'price-low'){
    //       sortData.sort((a,b)=> a.price - b.price)
    //     }
    //     if(sortOption === 'price-high'){
    //       sortData.sort((a,b)=> b.price - a.price)
    //     }
    //     setProductData(sortData)

    if (!productData || productData.length === 0) return;

    let sortedData = [...productData];

    if (sortOption === "price-low") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if(sortOption === "default"){
        sortedData = [...data]; // Reset to original data
    }
     else {
      // default case — no sorting
      sortedData = [...productData];
    }
    setProductData(sortedData);
  }, [sortOption]);
  return (
    <section className="mb-10 py-2 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* 🔍 Search Bar */}
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === "") setProductData(data);
              const matched = data.filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setProductData(matched);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
          />
        </div>

        {/* 🔽 Sorting Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white transition-all"
          >
            <option value="default">Sort By</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Searchbar;
