const BASE_URL = `https://productr-backend-api-1.onrender.com/api/auth`;
console.log(import.meta.env.VITE_BACKEND_URL);
export const registerUser = async (data) => {

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("image", data.image);

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    body: formData
  });

  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
};

export const verifyOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
};

export const resendOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getUserProfile = async () => {
  const res = await fetch(`${BASE_URL}/user-info`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();

};
