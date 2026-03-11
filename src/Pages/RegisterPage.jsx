import React, { useState } from "react";
import cartImage from "../assets/Card.png";
import cartLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setImagePreview(URL.createObjectURL(file));

    setFormData({
      ...formData,
      image: file
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    try {

      setLoading(true);

      const res = await registerUser(formData);

      if (res.success || res.message === "User registered successfully") {

        toast.success("Registration successful");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {

        toast.error(res.message || "Registration failed");

      }

    } catch (error) {

      console.error("Registration error:", error);
      toast.error("Something went wrong");

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

          <img src={cartImage} alt="Register Image" className="w-[312px] h-[480px]" />

        </div>

        {/* Right Side */}
        <div className="w-full flex flex-col justify-between items-start sm:p-16 p-4">

          <form onSubmit={handleSubmit} className="w-full flex flex-col">

            <h2 className="text-xl font-bold mb-6">
              Sign Up for your Productr Account
            </h2>

            {/* Image Upload */}
            <div className="flex flex-col items-center mb-6">

              <label className="cursor-pointer">

                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition">

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 text-center px-2">
                      Upload Photo
                    </span>
                  )}

                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

              </label>

            </div>

            {/* Name */}
            <label className="block text-black mb-2">Full Name</label>

            <input
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mb-4 p-2 border border-[#D4D4D4] rounded text-sm"
              value={formData.name}
            />

            {/* Email */}
            <label className="block text-black mb-2">Email Address</label>

            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mb-4 p-2 border border-[#D4D4D4] rounded text-sm"
              value={formData.email}
            />

            {/* Phone */}
            <label className="block text-black mb-2">Phone Number</label>

            <input
              name="phone"
              type="tel"
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full mb-4 p-2 border border-[#D4D4D4] rounded text-sm"
              value={formData.phone}
            />

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#071074] text-white p-3 rounded hover:bg-[#050c5a] transition text-sm disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {/* Login Link */}
          <div className="w-full bg-white border-[#D4D4D4] border px-8 py-4 rounded-lg mt-6 text-center flex flex-col items-center gap-2">

            <p className="text-[#98A2B3] text-sm">
              I already have an account?
            </p>

            <Link
              to="/"
              className="text-[#071074] text-sm hover:underline"
            >
              Login Here
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};

export default RegisterPage;