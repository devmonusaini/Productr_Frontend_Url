import React, { useState, useEffect } from "react";
import emptyProduct from "../assets/emptyProduct.png";
import UserInfo from "./userInfo";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../api/productApi";

const HomePage = () => {

  const [activeTab, setActiveTab] = useState("published");
  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter Products
  const publishedProducts = products.filter(
    (item) => item.status === "published"
  );

  const unpublishedProducts = products.filter(
    (item) => item.status === "unpublished"
  );

  const dataToShow =
    activeTab === "published" ? publishedProducts : unpublishedProducts;

  return (
    <>
      {/* Navbar */}
      <div className="w-full h-12 flex justify-end items-center navbarBackground pr-10 border border-[#D4D4D4] gap-2 relative">
        <UserInfo />
      </div>

      {/* Tabs */}
      <div className="w-full flex flex-col">

        <div className="w-full border-b border-[#D4D4D4] pl-10 flex gap-4">

          <button
            onClick={() => setActiveTab("published")}
            className={`text-sm font-semibold px-4 py-2 cursor-pointer border-b-2 
            ${activeTab === "published"
                ? "border-sky-600 text-black"
                : "border-transparent text-gray-500"
              }`}
          >
            Published
          </button>

          <button
            onClick={() => setActiveTab("unpublished")}
            className={`text-sm font-semibold px-4 py-2 cursor-pointer border-b-2 
            ${activeTab === "unpublished"
                ? "border-sky-600 text-black"
                : "border-transparent text-gray-500"
              }`}
          >
            Unpublished
          </button>

        </div>

        {/* Products Area */}
        <div className="w-full p-10">

          {dataToShow.length === 0 ? (

            <div className="w-full min-h-[calc(100vh-180px)] flex justify-center items-center">

              <div className="flex flex-col items-center">

                <img src={emptyProduct} alt="" className="w-24 h-24" />

                <h2 className="text-lg font-semibold mt-4">
                  No {activeTab === "published" ? "Published" : "Unpublished"} Products
                </h2>

                <p className="text-sm text-[#98A2B3]">
                  Your {activeTab} products will appear here
                </p>

              </div>

            </div>

          ) : (

            <div className="grid grid-cols-3 gap-6">

              {dataToShow.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  fetchProducts={fetchProducts}
                />
              ))}

            </div>

          )}

        </div>

      </div>
    </>
  );
};

export default HomePage;