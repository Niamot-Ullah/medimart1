import React, { useEffect, useState } from "react";
import { Link } from "react-router";

// const products = [
//   {
//     id: 1,
//     name: "Clothing ",
//     category: "Uncategorized",
//     price: "$150.00 / month",
//     oldPrice: "",
//     image:
//       "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     name: "DNK Yellow Shoes",
//     category: "Men",
//     price: "$120.00",
//     oldPrice: "$150.00",
//     image:
//       "https://images.unsplash.com/photo-1528701800489-20be3c73653e?auto=format&fit=crop&w=600&q=80",
//     tag: "Sale!",
//   },
//   {
//     id: 3,
//     name: "DNK Red Shoes",
//     category: "Men",
//     price: "$150.00",
//     image:
//       "https://images.unsplash.com/photo-1600185365229-98c5c2c3e243?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     name: "Dark Brown Jeans",
//     category: "Men",
//     price: "$150.00",
//     image:
//       "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 5,
//     name: "Blue Denim Jeans",
//     category: "Women",
//     price: "$150.00",
//     image:
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
//   },
// ];

const FeaturedProducts = () => {
    const [products,setProducts]= useState([])
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/featured-products`)
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    console.log(products);
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-gray-300 inline-block pb-2">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product.id} className="bg-white text-left rounded-lg">
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-t-lg w-full h-34 object-cover"
                />
                {/* {product.tag && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.tag}
                  </span>
                )} */}
              </div>

              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="mt-1">
                  {/* {product.oldPrice && (
                    <span className="text-gray-400 line-through mr-2">
                      {product.oldPrice}
                    </span>
                  )} */}
                  <span className="text-red-600 font-semibold">
                    ${product.price}
                  </span>
                </div>
                <div className="flex text-yellow-400 text-sm mt-2">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
