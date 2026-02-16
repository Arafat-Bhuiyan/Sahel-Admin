import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";
import Header from "@/Admin/Dashboard/Header";

export default function AdminLayout() {
  // State for currently selected menu in the sidebar
  console.log("first");

  const location = useLocation();

  const title = location.pathname.startsWith(`/admin/category`)
    ? "Category"
    : location.pathname.startsWith(`/admin/job-management`)
    ? "Job Management"
    : location.pathname.startsWith(`/admin/subscriber`)
    ? "Subscriber Management"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Settings"
    : "Dashboard Overview";

  const subtitle = location.pathname.startsWith(`/admin/category`)
    ? "Create, edit, and manage job offers"
    : location.pathname.startsWith(`/admin/job-management`)
    ? "Create, edit, and manage job offers"
    : location.pathname.startsWith(`/admin/subscriber`)
    ? "Manage subscribers and send SMS campaigns"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Configure system settings and integrations"
    : "Welcome back! Here's what's happening today.";
  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="flex font-poppins "
    >
      {/* Sidebar */}
      <div className="w-80 fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content area (pages render into the Outlet) */}
      <div className="flex-1 ml-80 min-h-screen overflow-y-auto">
        <Header title={title} subtitle={subtitle}/>
        <div className="px-6 bg-[#FBFBFB] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
