import axios from "axios";

const api = axios.create({
  baseURL: "https://craftlyng.com/api",
  withCredentials: true,
});

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}/products`);
    return response.data;
  },
};
