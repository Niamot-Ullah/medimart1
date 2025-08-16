// import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user,loading } = useAuth();
  // const [role, setRole] = useState();
  // const [isRoleLoading,setIsRoleLoading] =useState(true)

const {data:role,isLoading:isRoleLoading}= useQuery({
  queryKey:['role',user?.email],
  enabled: !loading && !!user?.email,
  queryFn: async()=>{
     const {data} = await axios(`${import.meta.env.VITE_API_URL}/user/role/${user?.email}`)
     return data
  }
})
console.log(role);



  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     if(!user) return setIsRoleLoading(false)
  //       try{
  //         const {data} = await axios(`${import.meta.env.VITE_API_URL}/user/role/${user?.email}`)
  //       setRole(data?.role)

  //     }catch(err){
  //       console.log(err);
  //     }finally{
  //         setIsRoleLoading(false)
  //       }
  //   };P
  //   fetchUserRole()
  // }, [user]);
  // console.log(role);
  return [role?.role, isRoleLoading];
};

export default useRole;
