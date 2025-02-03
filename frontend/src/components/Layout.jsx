// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is always shown */}
      <Navbar />
      
      {/* Main content area */}
      <div className="flex-grow bg-gray-100 container mx-auto p-8">
        {/* The content of the specific route will be rendered here */}
        <Outlet />
        {/* Toast notifications */}
        <ToastContainer />
      </div>
      
      {/* Footer is always shown */}
      <Footer />
    </div>
  );
}

