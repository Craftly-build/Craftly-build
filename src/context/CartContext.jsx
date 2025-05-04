import { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../apis/cartService";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { cart } = await cartService.getCart();
      setCart(cart || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart");
      toast.error("Could not load your cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      setLoading(true);
      const { cart: updatedCart } = await cartService.addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      setCart(updatedCart);
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Could not add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const { cart: updatedCart } = await cartService.removeFromCart(productId);
      setCart(updatedCart);
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      toast.error("Could not remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      setLoading(true);
      const { cart: updatedCart } = await cartService.updateQuantity(productId, action);
      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Could not update quantity");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.placeOrder();
      setCart([]);
      toast.success("Order placed successfully");
    } catch (err) {
      console.error("Failed to clear cart:", err);
      toast.error("Could not complete order");
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const addToRecentlyViewed = (product) => {
    if (!product) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product._id);
      return [{ ...product, id: product._id }, ...filtered].slice(0, 10);
    });
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    recentlyViewed,
    addToRecentlyViewed
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};