import React, { useRef, useState, useEffect } from "react";
import cartImage from "../assets/Card.png";
import cartLogo from "../assets/logo.png";
import { verifyOtp, resendOtp } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const VerifyOtp = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { refetchUser } = useAuth();

  const email = location.state?.email;
  const phone = location.state?.phone;

  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);

  /* Timer */
  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  /* Auto verify */
  useEffect(() => {

    const otpValue = otp.join("");

    if (otpValue.length === 6) {
      handleVerify();
    }

  }, [otp]);

  /* Input typing */
  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setOtpError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

  };

  /* Backspace */
  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }

  };

  /* Paste */
  const handlePaste = (e) => {

    e.preventDefault();

    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.slice(0, 6).split("");

    setOtp(newOtp);

  };

  /* Verify OTP */
  const handleVerify = async () => {

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Enter 6 digit OTP");
      return;
    }

    try {

      setLoading(true);

      const res = await verifyOtp({
        email,
        phone,
        otp: otpValue
      });

      if (res.success || res.message === "Login successful") {

        toast.success("OTP verified successfully");

        await refetchUser();

        navigate("/dashboard/home");

      } else {

        setOtpError(true);
        toast.error(res.message || "Invalid OTP");

      }

    } catch (error) {

      console.error(error);

      setOtpError(true);
      toast.error("Error verifying OTP");

    } finally {

      setLoading(false);

    }

  };

  /* Resend OTP */
  const handleResend = async () => {

    try {

      const res = await resendOtp({ email, phone });

      toast.success(res.message || "OTP resent");

      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setOtpError(false);

      inputRefs.current[0].focus();

    } catch (error) {

      console.error(error);
      toast.error("Error resending OTP");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="max-w-[1200px] w-full grid md:grid-cols-2 grid-cols-1 bg-white p-8 rounded-lg shadow-md gap-5">

        {/* Left */}
        <div className="relative backgroundImage sm:py-20 py-10 w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">

          <div className="absolute top-0 left-0 p-4">
            <img src={cartLogo} alt="Logo" className="w-[130px] h-[30px]" />
          </div>

          <img src={cartImage} alt="OTP" className="w-[312px] h-[480px]" />

        </div>

        {/* Right */}
        <div className="w-full flex flex-col justify-between items-start sm:p-16 p-4">

          <div className="w-full">

            <h2 className="text-xl font-bold mb-6">
              Verify OTP
            </h2>

            <label className="block text-black mb-3">
              Enter the 6 digit code
            </label>

            {/* OTP Inputs */}
            <div className="flex gap-3 mb-6" onPaste={handlePaste}>

              {otp.map((data, index) => (

                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-12 text-center border rounded-md text-lg focus:outline-none
                  ${otpError ? "border-red-500" : "border-gray-300 focus:border-[#071074]"}`}
                />

              ))}

            </div>

            <button
              disabled={loading}
              onClick={handleVerify}
              className="w-full bg-[#071074] text-white p-3 rounded hover:bg-[#050c5a]"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend */}
            <p className="text-[#98A2B3] text-sm mt-5">

              Didn't receive OTP?

              {timer > 0 ? (

                <span className="text-[#071074] ml-2">
                  Resend in {timer}s
                </span>

              ) : (

                <span
                  onClick={handleResend}
                  className="text-[#071074] ml-2 cursor-pointer"
                >
                  Resend OTP
                </span>

              )}

            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default VerifyOtp;