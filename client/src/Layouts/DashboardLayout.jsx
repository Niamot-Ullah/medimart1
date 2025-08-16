import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../Dashboard/SideBar';

const DashboardLayout = () => {
    return (
    <div className='relative min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <SideBar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1 md:ml-0 lg:ml-50'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default DashboardLayout;