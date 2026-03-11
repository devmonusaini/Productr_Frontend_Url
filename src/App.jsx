import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy Loaded Pages
const Login = lazy(() => import("./Pages/Login"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const VerifyOtp = lazy(() => import("./Pages/VerifyOtp"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const HomePage = lazy(() => import("./Components/HomePage"));
const ProductsPage = lazy(() => import("./Components/ProductsPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          {/* Suspense Loader */}
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>

            <Routes>

              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />

              {/* Protected Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >

                {/* Nested Routes */}
                <Route path="home" element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />

              </Route>

            </Routes>

          </Suspense>

        </AuthProvider>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );
}

export default App;