import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/images.png';
import { AiOutlineBars } from 'react-icons/ai';
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../Components/LoadingSpinner';
import BecomeSeller from './BecomeSeller';

const SideBar = () => {
    const [isActive, setActive] = useState(false)
    const [role,isRoleLoading] = useRole()
    // console.log(role);
     const handleToggle = () => {
    setActive(!isActive)
  }


//seller req
const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }




  if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
          {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between lg:hidden'>
        <div>
          {/* logo  */}
        <div className='flex text-center items-center justify-center py-4 mt-1 ml-4'>
                        <img alt='' src={logo} className='w-10 rounded-xl mr-1 md:mr-3'></img>
                        <Link to="/" className=" font-bold text-lg md:text-xl text-green-800  self-center">MediMart</Link>
                    </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
{/* side bar  */}
        <div className={`z-10 md:fixed flex flex-col  overflow-x-hidden bg-gray-100 w-50  absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}>
        {/* logo  */}
        <div className='flex text-center items-center justify-center py-4 mt-1 border-b-1 border-gray-400'>
                        <img alt='' src={logo} className='w-10 rounded-xl mr-1 md:mr-3'></img>
                        <Link to="/" className=" font-bold text-lg md:text-xl text-green-800  self-center">MediMart</Link>
                    </div>
{/* user       */}
          {
            role=== 'user' && <div>
            {/* one:my order  */}
            <div className='mt-2 font-semibold text-center '>
                <NavLink className={({ isActive }) => isActive ? 'w-full bg-gray-300  grid py-2' : 'w-full grid py-2'} to="/dashboard/my-orders">My Orders</NavLink>
            </div>
{/* two: become seller  */}
            <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        {/* <GrUserAdmin className='w-5 h-5' /> */}

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSeller closeModal={closeModal} isOpen={isOpen} />
          </div>
          }
          
{/* seller  */}
          {
            role === 'seller' && <div>
            {/* three:add product  */}
            <div className=' font-semibold text-center '>
                <NavLink className={({ isActive }) => isActive ? 'w-full bg-gray-300  grid py-2' : 'w-full grid py-2'} to="/dashboard/add-product">Add Product</NavLink>
            </div>
{/* four:my Inventory  */}
            <div className=' font-semibold text-center '>
                <NavLink className={({ isActive }) => isActive ? 'w-full bg-gray-300  grid py-2' : 'w-full grid py-2'} to="/dashboard/my-inventory">My Inventory</NavLink>
            </div>
{/* five : manage orders */}
            
          </div>
          }
{/* admin */}
          {
            role === 'admin' && <div>
{/* six : statistics */}
            <div className=' font-semibold text-center '>
                <NavLink className={({ isActive }) => isActive ? 'w-full bg-gray-300  grid py-2' : 'w-full grid py-2'} to="/dashboard/statistics">Statistics</NavLink>
            </div>
{/* seven: manage user  */}
            <div className=' font-semibold text-center '>
                <NavLink className={({ isActive }) => isActive ? 'w-full bg-gray-300  grid py-2' : 'w-full grid py-2'} to="/dashboard/manage-users">Manage Users</NavLink>
            </div>
          </div>
          }


        </div>
        </div>
    );
};

export default SideBar;