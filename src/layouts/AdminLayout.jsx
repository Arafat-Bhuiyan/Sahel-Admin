import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/Admin/Dashboard/Sidebar";
import Header from "@/Admin/Dashboard/Header";

export default function AdminLayout() {
  // State for currently selected menu in the sidebar
  console.log("first");

  const location = useLocation();

  const title = location.pathname.startsWith(`/admin/category`)
    ? "Catégories"
    : location.pathname.startsWith(`/admin/job-management`)
    ? "Gestion des tâches"
    : location.pathname.startsWith(`/admin/subscriber`)
    ? "Gestion des abonnés"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Paramètres"
    : "Tableau de bord";

  const subtitle = location.pathname.startsWith(`/admin/category`)
    ? "Créer, modifier et gérer les catégories"
    : location.pathname.startsWith(`/admin/job-management`)
    ? "Créer, modifier et gérer les tâches"
    : location.pathname.startsWith(`/admin/subscriber`)
    ? "Gérer les abonnés et envoyer des campagnes SMS"
    : location.pathname.startsWith(`/admin/settings`)
    ? "Configurer les paramètres du système et les intégrations"
    : "Bienvenue! Voici ce qui se passe aujourd'hui.";
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
