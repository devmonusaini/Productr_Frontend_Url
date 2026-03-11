import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import {
  deleteProduct,
  toggleProductStatus,
} from "../api/productApi";
import { toast } from "react-toastify";

const ProductCard = ({
  product,
  fetchProducts,
  setEditProductOpen,
  setAddProductOpen,
  setEditProduct
}) => {

  const [activeImage, setActiveImage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const images = product?.productImage || [];

  // DELETE PRODUCT
  const confirmDelete = async () => {
    try {
      const res = await deleteProduct(product._id);

      if (res.success) {
        toast.success("Product deleted");
        fetchProducts();
        setShowDeleteModal(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TOGGLE STATUS
  const handleToggleStatus = async () => {
    try {
      const res = await toggleProductStatus(product._id);

      if (res.success) {
        fetchProducts();
        toast.success("Product status updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = () => {
    setEditProduct(product);
    setEditProductOpen(true);
    setAddProductOpen(false);
  };

  return (
    <>
      <div className="w-full border border-[#D4D4D4] rounded-lg p-4 flex flex-col gap-4 bg-white">

        {/* IMAGE */}
        <div className="w-full bg-[#F8F9FB] rounded relative flex items-center justify-center border border-[#D4D4D4]">
          {images.length > 0 ? (
            <img
              src={
                images[activeImage]
                  ? `http://localhost:5000/uploads/${images[activeImage]}`
                  : ""
              }
              alt={product.productName}
              className="h-[215px] object-contain p-2"
            />
          ) : (
            <p className="text-gray-400 text-sm">No Image</p>
          )}

          {images.length > 1 && (
            <div className="absolute -bottom-3 flex gap-1 bg-white px-3 py-2 rounded-xl border border-[#D4D4D4]">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeImage === index ? "bg-red-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{product.productName}</h3>

          <p className="text-sm text-[#98A2B3] flex justify-between">
            <span>Product Type</span>
            <span>{product.category}</span>
          </p>

          <p className="text-sm text-[#98A2B3] flex justify-between">
            <span>Quantity</span>
            <span>{product.quantity}</span>
          </p>

          <p className="text-sm text-[#98A2B3] flex justify-between">
            <span>MRP</span>
            <span>{product.mrp}</span>
          </p>

          <p className="text-sm text-[#98A2B3] flex justify-between">
            <span>Selling Price</span>
            <span>{product.price}</span>
          </p>

          <p className="text-sm text-[#98A2B3] flex justify-between">
            <span>Brand</span>
            <span>{product.brandName}</span>
          </p>

          <p className="text-sm text-[#98A2B3] flex justify-between">
            <span>Total Images</span>
            <span>{images.length}</span>
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-3">

          {/* STATUS */}
          <button
            onClick={handleToggleStatus}
            className={`flex-1 text-sm font-medium ${
              product.status === "published"
                ? "bg-[#071074]"
                : "bg-green-500"
            } text-white p-3 rounded-xl`}
          >
            {product.status === "published"
              ? "Published"
              : "Unpublished"}
          </button>

          {/* EDIT */}
          <button
            onClick={handleEdit}
            className="flex-1 text-sm font-medium bg-transparent text-[#344054] p-3 rounded-xl border-2 border-[#D4D4D4]"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-sm font-medium bg-transparent text-[#344054] p-3 rounded-xl border-2 border-[#D4D4D4]"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl w-[350px] p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-3">
              Delete Product
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-end gap-3">

              {/* <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button> */}

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#071074] text-white rounded-lg"
              >
                 Delete
              </button>

            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default ProductCard;