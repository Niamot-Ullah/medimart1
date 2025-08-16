import React from 'react';
import { Link } from 'react-router';

const ShopProductCard = ({product}) => {
    return (
       
            <div className="card mx-auto h-64 w-58 bg-base-100  shadow-sm">
  <figure className=''>
    <img
    className='flex-1 w-full object-cover'
      src={product.imageUrl}
      alt={product.name} />
  </figure>
  <div className="">
    <h2 className="card-title px-3 mt-5">{product.name}</h2>
    <p className='px-3 text-gray-500 text-sm mb-2'>{product.description}</p>
    <p className='px-3'>Price: ${product.price}</p>
    <Link to={`/product/${product._id}`} className="">
      <button
              
              className="w-full bg-lime-700 hover:bg-lime-950 py-2 mt-5 text-center font-medium text-white rounded-b-md  cursor-pointer"
            >
              View Details
            </button>
    </Link>
  </div>
</div>
        
    );
};

export default ShopProductCard;