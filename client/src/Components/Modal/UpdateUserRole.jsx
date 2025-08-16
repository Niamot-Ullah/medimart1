import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


const UpdateUserRole = ({isOpen,setIsOpen,role,email}) => {
    const queryClient = useQueryClient()
  const [updateRole,setUpdateRole] = useState(role)
  function close() {
    setIsOpen(false);
  }
console.log(email);

const mutation = useMutation({
  mutationFn: async(role)=>{
    const {data} = axios.patch(`${import.meta.env.VITE_API_URL}/user/role/update/${email}`,{role})
    return data
  },
  onSuccess:(data)=>{
    //   refetch()
    console.log(data);
    toast.success('User role updated successfully!')
    setIsOpen(false)
    queryClient.invalidateQueries(['users'])
  },
  onError: error =>{
    console.log(error);
  }
})

const handleSubmit =e =>{
    e.preventDefault()
    mutation.mutate(updateRole)
}

  return (
    <>


      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full shadow-2xl max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                Update User Role
              </DialogTitle>

              <form onSubmit={handleSubmit} action="">
                <div>
                  <select
                  value={updateRole}
                  onChange={e=>setUpdateRole(e.target.value)}
                    name=""
                    id=""
                    className="border py-1 px-3 w-full rounded mt-2"
                  >
                    
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-between mt-3">
                  <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 cursor-pointer">Update</button>
                  <button onClick={close} type="button" className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 cursor-pointer" >Cancel</button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateUserRole;
