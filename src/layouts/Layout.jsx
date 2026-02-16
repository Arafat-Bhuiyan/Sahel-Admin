import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";

export const Layout = () => {
  return (
    <div className="bg-[#FFFFFF]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
