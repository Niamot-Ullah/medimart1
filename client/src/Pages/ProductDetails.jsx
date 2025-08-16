import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import PurchaseModal from "../Components/PurchaseModal";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";
import axios from "axios";
import {  useQuery } from "@tanstack/react-query";

const ProductDetails = () => {
  const {id} = useParams()
  const [role,isRoleLoading] = useRole()
  const {user} = useAuth()
  // const product = useLoaderData();
  let [isOpen, setIsOpen] = useState(false);
  
  const {data:product,isLoading,refetch} = useQuery({
    queryKey:['product',id],
    queryFn: async ()=>{
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/product/${id}`)
      return data
    }
  })


  const closeModal = () => {
    setIsOpen(false);
  };
  if (!product || typeof product !== "object")
    return (
      <p className="min-h-screen text-center text-2xl font-bold mt-20">
        Sorry, product not found.
      </p>
    );
  


  if(isRoleLoading || isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="py-20 w-11/12 md:w-10/12 mx-auto">
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full "
                src={product.imageUrl}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-600">{product.category}</p>

          <hr className="my-6" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            {product.description}
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Seller: {product.seller.name}</div>

            <img
              className="rounded-full"
              height="30"
              width="30"
              // alt='Avatar'
              referrerPolicy="no-referrer"
              src={product.seller.image}
              alt={product.seller.name}
            />
          </div>
          <hr className="my-6" />
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity: {product.quantity} Units Left Only!
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">
              Price : {product.price}$
            </p>
            <div>
              <button
                onClick={() => setIsOpen(true)}
                label="Purchase"
                className={`w-full py-3 px-4 mt-5 text-center font-medium text-white transition duration-200 rounded-xl shadow-xs bg-lime-600  ${!user|| user.email === product.seller.email|| role !== 'user'  ? 'opacity-50 cursor-not-allowed' : ' hover:bg-lime-800 cursor-pointer'}`}
                disabled={!user || user.email === product.seller.email || role !== 'user'}
              >
                {user ? 'Purchase' : 'Login to Purchase'}
              </button>
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal fetchProduct={refetch} product={product} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
