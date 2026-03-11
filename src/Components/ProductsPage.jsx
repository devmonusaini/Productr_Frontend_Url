import { Handbag, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import emptyProduct from "../assets/emptyProduct.png";
import AddProducts from "./AddProducts";
import ProductCard from "./ProductCard";
import UserInfo from "./UserInfo";
import { getAllProducts } from "../api/productApi";
import UpdateProduct from "./UpdateProduct";

const ProductsPage = () => {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch products 
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Load products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Navbar */}
     <div className="w-full h-12 flex justify-between items-center navbarBackground px-10 border border-[#D4D4D4] gap-2 relative">
        <div className="flex items-center gap-2">
          <Handbag size={18} className="text-[#344054]" />
          <h2 className="text-lg font-bold text-[#344054]">Products</h2>
        </div>
        <div className="flex justify-center items-center z-50">
          <UserInfo />
        </div>
      </div>

      {/* Empty Product UI */}
      {products.length === 0 ? (
        <div className="w-full min-h-[calc(100vh-48px)] flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={emptyProduct} className="w-24 h-24" />

            <h2 className="text-lg font-semibold mt-4">
              Feels a little empty over here...
            </h2>

            <p className="text-sm text-[#98A2B3]">
              You can create products without connecting store
            </p>

            <p className="text-sm text-[#98A2B3]">
              Add products to sell anything
            </p>

            <button
          onClick={() => {
  setEditProduct(null);
  setAddProductOpen(true);
}}
              className="mt-4 p-2 bg-[#071074] text-white rounded hover:bg-[#050c5a]"
            >
              Add Your Product
            </button>
          </div>
        </div>
      ) : (
        /* Product List */
        <div className="w-full min-h-[calc(100vh-48px)] flex flex-col pt-5 pb-10 px-10">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Products</h2>

            <button
              onClick={() => setAddProductOpen(true)}
              className="p-2 text-[#344054] flex items-center gap-2"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          <div className="w-full grid grid-cols-3 gap-5">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                fetchProducts={fetchProducts}
                setEditProductOpen={setEditProductOpen}
                setEditProduct={setEditProduct}
                setAddProductOpen={setAddProductOpen}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
   {addProductOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <AddProducts
      setAddProductOpen={setAddProductOpen}
      fetchProducts={fetchProducts}
      
    />
  </div>
)}
   { 
    editProductOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <UpdateProduct
      setEditProductOpen={setEditProductOpen} 
      fetchProducts={fetchProducts}
      editProduct={editProduct}
  
    />
  </div>
)}
    </>
  );
};

export default ProductsPage;

