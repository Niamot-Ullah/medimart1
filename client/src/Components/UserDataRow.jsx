import React, { useState } from 'react';
import UpdateUserRole from './Modal/UpdateUserRole';

const UserDataRow = ({user}) => {
    let [isOpen, setIsOpen] = useState(false);
    const { email, role, status } = user
    return (
  
                      <tr >
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {role}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className={`${status === 'requested' ? 'text-yellow-500':status==='verified' ? 'text-green-600':'text-red-600'}`}>
                        {status ? status : 'unavailable'}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span onClick={()=>{setIsOpen(true)}} className="relative cursor-pointer inline-block px-3 py-3  font-semibold text-black w-25 h-10 leading-tight ">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 w-full bg-green-200  text-black rounded-xl text-center mt-3"
                        >Update Role</span>
                        <span className="relative "><UpdateUserRole isOpen={isOpen} setIsOpen={setIsOpen} role={role} email={email} ></UpdateUserRole></span>
                      </span>
                     
                    </td>
                  </tr>
    )
};

export default UserDataRow;