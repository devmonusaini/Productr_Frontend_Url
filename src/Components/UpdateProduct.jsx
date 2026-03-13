import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { updateProduct } from "../api/productApi";
import {toast} from "react-toastify"
const UpdateProduct= ({ setEditProductOpen, fetchProducts ,editProduct }) => {
  const BASE_URL = `https://productr-backend-api-1.onrender.com`; 
    const [formData, setFormData] = useState({
      productName: "",
      productType: "",
      quantity: "",
      mrp: "",
      price: "",
      brandName: "",
      exchangeEligibility: "yes",
      productImage: [],
      productDescription: "",
    });


 useEffect(() => {
  if (editProduct) {
    setFormData({
      productName: editProduct.productName || "",
      productType: editProduct.category || "",
      quantity: editProduct.quantity || "",
      mrp: editProduct.mrp || "",
      price: editProduct.price || "",
      brandName: editProduct.brandName || "",
      exchangeEligibility: editProduct.exchangeEligibility || "yes",
      productImage:
        editProduct.productImage?.map((img) => ({
          preview: `${BASE_URL}/uploads/${img}`,
        })) || [],
      productDescription: editProduct.description || "",
    });
  }
}, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, ...imageUrls],
    }));
  };

  const removeImage = (index) => {
    const updatedImages = formData.productImage.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      productImage: updatedImages,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    form.append("productName", formData.productName);
    form.append("category", formData.productType);
    form.append("quantity", formData.quantity);
    form.append("mrp", formData.mrp);
    form.append("price", formData.price);
    form.append("brandName", formData.brandName);
    form.append("exchangeEligibility", formData.exchangeEligibility);
    form.append("description", formData.productDescription);

    formData.productImage.forEach((img) => {
      if (img.file) {
        form.append("productImage", img.file);
      } else {
        form.append("existingImages", img.preview);
      }
    });

    const res = await updateProduct(editProduct._id, form);

    if (res?.success) {
      fetchProducts();
      setEditProductOpen(false);
      toast.success("product updated successfully")
    }

  } catch (error) {
    toast.error(error);
  }
};
  return (
    <div className="max-w-[400px] w-full  max-h-[95vh] overflow-y-auto bg-white rounded-xl shadow-lg">
      <div className="w-full flex justify-between items-center flex-row p-4 border-b border-[#D4D4D4]">
        <h2 className="text-lg font-normal ">Add Product</h2>
        <button
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setEditProductOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            name="productName"
            value={formData.productName}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter product name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Type
          </label>

          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full outline-none"
            >
              <option value="">Select product type</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Kitchen</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity Stock
          </label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="total number of stock"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">MRP</label>

          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter MRP"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Selling Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter selling price"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand Name
          </label>

          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter brand name"
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="w-full flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Upload Product Image
            </label>
            {formData.productImage.length > 0 && (
              <>
                <input
                  type="file"
                  multiple
                  id="productImage"
                  name="productImage"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <label
                  htmlFor="productImage"
                  className="cursor-pointer  p-2 rounded text-sm"
                >
                  Add More Images
                </label>
              </>
            )}
          </div>

          {formData.productImage.length > 0 ? (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {formData.productImage.map((img, index) => (
                <div
                  key={index}
                  className="relative p-3  border border-[#D4D4D4] rounded"
                >
                  <img
                    src={img.preview}
                    alt=""
                    className="w-full h-12 object-cover rounded"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1  cursor-pointer text-black text-bold rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 flex justify-center items-center flex-col">
              <input
                name="productDescription"
                value={formData.productDescription}
                className="text-center outline-none"
                placeholder="Enter description"
                onChange={handleChange}
              />

              <input
                type="file"
                multiple
                id="productImageUpload"
                name="productImage"
                className="hidden"
                onChange={handleImageUpload}
              />

              <label
                htmlFor="productImageUpload"
                className="cursor-pointer  p-2 rounded text-sm font-bold text-black"
              >
                Browse
              </label>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Exchange or return eligibility
          </label>

          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <select
              name="exchangeEligibility"
              value={formData.exchangeEligibility}
              onChange={handleChange}
              className="w-full outline-none"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-end items-center navbarBackground p-2">
          <button
            type="submit"
            className="bg-[#071074] text-white p-3 hover:bg-[#050c5a] rounded-xl"
          >
           Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;


