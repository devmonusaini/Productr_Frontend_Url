import React from "react";
import DashboardLogo from "../assets/dashboardLogo.png";
import { Handbag, House, Search } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-[240px] h-screen fixed top-0 left-0 bg-[#1D222B] p-4 flex flex-col gap-2">

        <img
          src={DashboardLogo}
          alt="Dashboard Logo"
          className="w-[130px] h-[30px]"
        />

        {/* Search */}
        <div className="bg-[#6B768380] rounded flex items-center gap-2 px-3 py-2">
          <Search size={14} color="#D1D5DB" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm text-[#D1D5DB] outline-none bg-transparent"
          />
        </div>

      {/* Menu */}

<NavLink
  to="/dashboard/home"
  className={({ isActive }) =>
    `mt-8 px-2 py-1 block ${
      isActive ? " rounded text-white" : "text-[#98A2B3]"
    }`
  }
>
  <p className="text-sm flex items-center gap-4">
    <House size={18} /> Home
  </p>
</NavLink>


<NavLink
  to="/dashboard/products"
  className={({ isActive }) =>
    `px-2 py-1 block ${
      isActive ? " rounded text-white" : "text-[#98A2B3]"
    }`
  }
>
  <p className="text-sm flex items-center gap-4">
    <Handbag size={18} /> Products
  </p>
</NavLink>

      </div>

      {/* Content */}
      <div className="w-[calc(100%-240px)] ml-[240px] ">
        <Outlet className="p-0 margin-0" />
      </div>

    </div>
  );
};

export default Dashboard;