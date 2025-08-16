import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../Components/LoadingSpinner';

const MyProfile = () => {
    const {user} = useAuth()
    const [role, isRoleLoading] = useRole()
    if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <>
            <div className="w-11/12 md:w-10/12 mx-auto card flex flex-col md:flex-row card-side bg-base-100 shadow-sm my-20 max-h-96 max-w-[800px] gap-2">
  <figure className='flex-1'>
    <img
      src={user?.photoURL}
      alt={user?.displayName} />
  </figure>
  <div className=" flex-1 px-4 py-4 space-x-5 space-y-1  md:self-center">
    <h2 className="text-2xl">Name : <span className='font-semibold text-gray-500'>{user?.displayName}</span></h2>
    <p>Role : <span className='font-semibold text-gray-500'> {role.toUpperCase()} </span></p>
    <p>email : <span className='font-semibold text-gray-500'>{user?.email}</span></p>
    <p>UserID : <span className='font-semibold text-gray-500'>{user?.uid}</span></p>
    
  </div>
</div>
        </>
    );
};

export default MyProfile;