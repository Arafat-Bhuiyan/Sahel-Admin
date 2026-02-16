import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import Category from "@/Admin/Category/Category";
import JobManagement from "@/Admin/JobManagement/JobManagement";
import Subscriber from "@/Admin/Subscriber/Subscriber";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      { path: "category", element: <Category /> },
      { path: "job-management", element: <JobManagement /> },
      { path: "subscriber", element: <Subscriber /> },
      { path: "settings", element: <TermsAndPolicies /> },
    ],
  },
]);

export default router;
