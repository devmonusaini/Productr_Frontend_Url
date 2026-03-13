const BASE_URL = `https://productr-backend-api-1.onrender.com/api/products`;

export const createProduct = async (data) => {

  const formData = new FormData();

  formData.append("productName", data.productName);
  formData.append("description", data.productDescription);
  formData.append("price", data.price);
  formData.append("mrp", data.mrp);
  formData.append("quantity", data.quantity);
  formData.append("brandName", data.brandName);
  formData.append("category", data.productType);
  formData.append("exchangeEligibility", data.exchangeEligibility);

  data.productImage.forEach((img) => {
    formData.append("productImage", img.file);
  });

  const res = await fetch(`${BASE_URL}/create-product`, {
    method: "POST",
    credentials: "include",
    body: formData
  });

  return res.json();
};


export const getAllProducts = async () => {

  const res = await fetch(`${BASE_URL}/products`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};


export const updateProduct = async (id, data) => {

  const res = await fetch(`${BASE_URL}/update-product/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data
  });

  return res.json();
};


export const deleteProduct = async (id) => {

  const res = await fetch(`${BASE_URL}/delete-product/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  return res.json();
};


export const toggleProductStatus = async (id) => {

  const res = await fetch(`${BASE_URL}/toggle-product/${id}`, {
    method: "PATCH",
    credentials: "include"
  });

  return res.json();

};
