/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

function Layout() {
  return (
    <div className="w-screen h-screen flex flex-row relative overflow-hidden bg-[#fafafa] ">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
