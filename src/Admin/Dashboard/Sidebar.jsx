import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Grid2x2Plus,
  Briefcase,
  Users,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";
import logo from "@/assets/img/logo.png";
import watermark from "@/assets/img/watermark.png";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/services/authSlice";

export const Sidebar = ({ currentComponent, onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Tableau de bord",
      active: true,
      slug: "dashboard",
    },
    { icon: Grid2x2Plus, label: "Catégories", slug: "category" },
    { icon: Briefcase, label: "Gestion des tâches", slug: "job-management" },
    { icon: Users, label: "Gestion des abonnés", slug: "subscriber" },
    { icon: Settings, label: "Paramètres", slug: "settings" },
  ];
  const location = useLocation();

  // NavLink will determine active state; build `to` from slug below.
  return (
    <div className="w-full h-[100vh] shadow-xl flex flex-col justify-between [&::-webkit-scrollbar]:hidden bg-white border-r border-[#E2E2E2] overflow-hidden">
      {/* Logo */}
      <div>
        <div className="w-full">
          <div className="flex flex-col items-center gap-2.5 justify-start">
            <img src={logo} alt="logo" />
          </div>
        </div>
        {/* Navigation */}
        <nav className="w-full self-start  ">
          <ul className="w-full ">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              // Dashboard should link to the admin index route
              const to =
                item.slug === "dashboard" ? "/admin" : `/admin/${item.slug}`;
              return (
                <li key={index}>
                  <NavLink
                    to={to}
                    className={() =>
                      `flex items-center h-12 pl-6 py-3 text-start text-base font-normal transition-colors mx-4 mb-1 gap-3 ${
                        location.pathname.startsWith(`/admin/${item.slug}`) ||
                        (item.slug === "dashboard" &&
                          location.pathname === "/admin")
                          ? "bg-[#30618B] text-[#FFFFFF] rounded-xl shadow-lg backdrop-blur-md "
                          : "text-[#4A5565] rounded-sm"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Watermark */}
        <div className="w-full">
          <img className="w-full opacity-10" src={watermark} />
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#E2E2E2]">
        <button
          onClick={handleLogout}
          className="w-full self-stretch px-3 py-2.5 rounded-2xl flex justify-start items-center gap-2 hover:bg-zinc-50 transition-colors"
        >
          <div className="inline-flex flex-col justify-start items-start">
            <div className="w-6 h-7 relative flex items-center justify-center">
              <LogOut className="w-4 h-4 text-black" />
            </div>
          </div>
          <div className="inline-flex flex-col justify-start items-start text-start">
            <div className="justify-center text-black text-sm font-medium leading-5">
              Déconnexion
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
