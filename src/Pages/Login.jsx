import React, { useState } from "react";
import cartImage from "../assets/Card.png";
import cartLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      identifier: e.target.value
    });

    setError("");

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const value = formData.identifier.trim();

    if (!value) {
      toast.error("Please enter email or phone number");
      return;
    }

    let payload = {};

    // check if phone number
    if (/^\d+$/.test(value)) {
      payload.phone = value;
    } else {
      payload.email = value;
    }

    try {

      setLoading(true);
      setError("");

      const res = await loginUser(payload);

      if (res.message === "OTP sent successfully") {

        toast.success("OTP sent successfully");

        navigate("/verify-otp", {
          state: payload
        });

      } else {

        toast.error(res.message || "Failed to send OTP");

      }

    } catch (error) {

      console.error("Login error:", error);
      setError("An error occurred. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="max-w-[1200px] w-full grid md:grid-cols-2 grid-cols-1 bg-white p-8 rounded-lg shadow-md gap-5">

        {/* Left Side */}
        <div className="relative backgroundImage sm:py-20 py-10 w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">

          <div className="absolute top-0 left-0 p-4">
            <img src={cartLogo} alt="Logo" className="w-[130px] h-[30px]" />
          </div>

          <img src={cartImage} alt="Login Image" className="w-[312px] h-[480px]" />

        </div>

        {/* Right Side */}
        <div className="w-full flex flex-col justify-between items-start sm:p-24 p-4">

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col"
          >

            <h2 className="text-xl font-bold mb-6">
              Login to your Productr Account
            </h2>

            <label className="block text-black mb-2">
              Email or Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter email or phone number"
              className="w-full mb-4 p-2 border border-[#D4D4D4] rounded text-sm"
              onChange={handleChange}
              value={formData.phone}
              required
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#071074] text-white p-3 rounded hover:bg-[#050c5a] transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>

          </form>

          <div className="w-full bg-white border-[#D4D4D4] border px-8 py-4 rounded-lg mt-6 text-center flex flex-col items-center gap-2">

            <p className="text-[#98A2B3] text-sm">
              Don't have a productr account?
            </p>

            <Link
              to="/signup"
              className="text-[#071074] text-sm cursor-pointer hover:underline"
            >
              Sign Up Here
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;