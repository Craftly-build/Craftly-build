import axios from "axios";

const api = axios.create({
  baseURL: "https://craftlyng.com/login",
  withCredentials: true, // Required for sessions
});

export const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  addToCart: async (product) => {
    const response = await api.post("/addtocart", { product });
    return response.data;
  },

  removeFromCart: async (id) => {
    const response = await api.post("/removeproduct", { id });
    return response.data;
  },

  updateQuantity: async (id, action) => {
    const response = await api.post("/editProductQuantity", { id, action });
    return response.data;
  },

  placeOrder: async () => {
    const response = await api.post("/placeorder");
    return response.data;
  },

  getPaymentInfo: async () => {
    const response = await api.get("/payment");
    return response.data;
  },
};
