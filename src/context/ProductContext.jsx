import { createContext, useContext, useState } from 'react';
import { productService } from '../apis/productService';
import { categoryService } from '../apis/categoryService';
import toast from 'react-hot-toast';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      const data = await productService.getProducts(params);
      setProducts(data.products);
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total
      });
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products');
      toast.error('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load categories');
      toast.error('Could not load categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const data = await categoryService.getProductsByCategory(categoryId);
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products by category:', err);
      setError('Failed to load products');
      toast.error('Could not load products for this category');
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      return await productService.getProduct(id);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      setError('Failed to load product');
      toast.error('Could not load product details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getTrendingProducts();
      return data;
    } catch (err) {
      console.error('Failed to fetch trending products:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getFeaturedProducts();
      return data;
    } catch (err) {
      console.error('Failed to fetch featured products:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (id) => {
    try {
      setLoading(true);
      const data = await productService.getRelatedProducts(id);
      return data;
    } catch (err) {
      console.error('Failed to fetch related products:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    categories,
    loading,
    error,
    pagination,
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
    fetchProduct,
    fetchTrendingProducts,
    fetchFeaturedProducts,
    fetchRelatedProducts
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};"use client"

