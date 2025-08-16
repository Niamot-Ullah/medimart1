import useAuth from './../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyInventory = () => {
const {user} = useAuth();
  const {data:myProduct,isLoading,refetch} = useQuery({
    queryKey:['orders',user?.email],
    queryFn: async ()=>{
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/orders/seller/${user?.email}`)
      return data
    }
  })
console.log(myProduct);


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
          {myProduct?.map((product) => (
            <tr key={product._id} className="border-t text-sm text-gray-700">
              <td className="px-4 py-2">
                <img
                  src={product?.imageUrl}
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 font-semibold">{product?.name}</td>
              <td className="px-4 py-2">{product?.category}</td>
              <td className="px-4 py-2">${product?.price}</td>
              <td className="px-4 py-2">{product?.quantity}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default MyInventory;