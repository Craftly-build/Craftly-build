import axios from "axios";

const api = axios.create({
  baseURL: "https://craftlyng.com/login",
  withCredentials: true,
});

export const productService = {
  // Get products with filtering, sorting, pagination
  getProducts: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Get single product
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get trending products
  getTrendingProducts: async () => {
    const response = await api.get("/products/trending");
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get("/products/featured");
    return response.data;
  },

  // Get related products
  getRelatedProducts: async (id) => {
    const response = await api.get(`/products/related/${id}`);
    return response.data;
  },
};
