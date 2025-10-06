import React from 'react';
import { Link } from 'react-router';
import { FaShoppingCart, FaBalanceScale } from "react-icons/fa";


const ShopProductCard = ({item}) => {
    return (
       
            <div key={item._id} className="max-w-3xl  w-90 sm:w-64 bg-white rounded-lg shadow-md overflow-hidden  hover:shadow-xl transition-shadow mx-auto">
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
                      <li className=''>• {item.description}</li>
                      <li>• Category : <span className="font-semibold">{item.category}</span>   </li>
                      <li>• Seller : <span className="font-semibold">{item.seller.name}</span></li>
                    </ul>
            
                    {/* Price Section */}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-red-600 font-bold text-xl">{item.price}$</span>
                      
                    </div>
            
                    {/* Buttons */}
                    <div className="flex gap-2 items-end mt-3">
                      <Link to={`/product/${item._id}`} className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2 rounded-md hover:bg-green-700 transition">
                        <FaShoppingCart /> Buy Now
                      </Link>
                      
                    </div>
                  </div>
                </div>
        
    );
};

export default ShopProductCard;