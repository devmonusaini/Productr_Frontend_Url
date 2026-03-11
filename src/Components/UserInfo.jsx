import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import userImage from "../assets/user.jpg";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import {toast} from "react-toastify"
 
const UserInfo = () => {
      const [showDropdown, setShowDropdown] = useState(false);
      const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}`
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/");
      toast.success("logout successfull")
    } catch (error) {
      toast.error("Logout error:", error);
      // Still logout on client side even if API call fails
      logout();
      navigate("/");
    }
  };
  return (
    <>
    
      <img
        src={user?.image ? `${Base_URL}/uploads/${user.image}` : userImage}
        className="w-8 h-8 rounded-full mr-2 object-cover"
        alt="user"
      />

      <span className="text-sm font-medium">
        {user?.name || "User"}
      </span>

      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="focus:outline-none"
      >
        <ChevronDown size={20} className="cursor-pointer" />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-10 mt-2 bg-white border border-[#D4D4D4] rounded shadow-lg z-10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 text-sm"
          >
            Logout
          </button>
        </div>
      )}

    </>
  )
}

export default UserInfo