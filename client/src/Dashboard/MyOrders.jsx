import React from 'react';
import useAuth from './../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyOrders = () => {
  const {user} = useAuth();
  const {data:orders,isLoading,refetch} = useQuery({
    queryKey:['orders',user?.email],
    queryFn: async ()=>{
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/orders/user/${user?.email}`)
      return data
    }
  })
console.log(orders);
  

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Quantity</th>
            
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id} className="border-t text-sm text-gray-700">
              <td className="px-4 py-2">
                <img
                  src={order?.productImage}
                  alt={order?.productName}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 font-semibold">{order?.productName}</td>
              <td className="px-4 py-2">{order?.productCategory}</td>
              <td className="px-4 py-2">${order?.price}</td>
              <td className="px-4 py-2">{order?.quantity}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;