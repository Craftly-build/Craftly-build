// src/services/cartService.js
import axios from 'axios';

// Create an axios instance with the correct configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Important for session cookies to work
});

export const cartService = {
  // Get the current cart
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error.response?.data || { error: 'Failed to fetch cart' };
    }
  },

  // Add a product to the cart
  addToCart: async (product) => {
    try {
      const response = await api.post('/addtocart', { product });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error.response?.data || { error: 'Failed to add to cart' };
    }
  },

  // Remove a product from the cart
  removeFromCart: async (id) => {
    try {
      const response = await api.post('/removeproduct', { id });
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error.response?.data || { error: 'Failed to remove from cart' };
    }
  },

  // Edit product quantity in the cart
  updateQuantity: async (id, action) => {
    try {
      const response = await api.post('/editProductQuantity', { id, action });
      return response.data;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error.response?.data || { error: 'Failed to update quantity' };
    }
  },

  // Place an order
  placeOrder: async () => {
    try {
      const response = await api.post('/placeorder');
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error.response?.data || { error: 'Failed to place order' };
    }
  },

  // Get payment information
  getPaymentInfo: async () => {
    try {
      const response = await api.get('/payment');
      return response.data;
    } catch (error) {
      console.error('Error getting payment info:', error);
      throw error.response?.data || { error: 'Failed to get payment info' };
    }
  },
};