import useAuth from "./../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router";

const MyInventory = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const {
    data: myProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/orders/seller/${user?.email}`
      );
      return setData(data);
    },
  });
  // console.log(data);
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        if (d.deletedCount > 0) {
          const updatedData = data.filter((item) => item._id !== id);
          setData(updatedData);
          toast.success("Product deleted successfully");
        }
      });
  };

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
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
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
              <td className="px-4 py-2 flex space-x-4 mt-5">
                <Link to={`update-product/${product?._id}`} className="self-center ">
                  <RxUpdate size={23} />
                </Link>
                <Link onClick={() => handleDelete(product._id)}>
                  <MdDelete size={25} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyInventory;
