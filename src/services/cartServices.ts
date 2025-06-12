import { api } from './api';
import type { CartItem } from '../types';

export interface CartResponse {
  id: string;
  items: Array<{
    id: string;
    product: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  total: number;
}

// Mock cart data for fallback
let mockCart: CartResponse = {
  id: 'mock-cart',
  items: [],
  total: 0,
};

// Check if backend is available
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    await api.get('/api/health/', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
};

export const getCart = async (): Promise<CartResponse> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await api.get('/api/cart/');
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock cart:', error);
  }

  // Fallback to mock data
  return mockCart;
};

export const addToCart = async (productId: string, quantity: number, size?: string, color?: string): Promise<CartResponse> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await api.post('/api/cart/items/', {
        product: productId,
        quantity,
        size,
        color,
      });
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock cart:', error);
  }

  // Fallback to mock data
  const existingItemIndex = mockCart.items.findIndex(
    item => item.product === productId && item.size === size && item.color === color
  );

  if (existingItemIndex >= 0) {
    mockCart.items[existingItemIndex].quantity += quantity;
  } else {
    mockCart.items.push({
      id: `mock-item-${Date.now()}`,
      product: productId,
      quantity,
      size,
      color,
    });
  }

  return mockCart;
};

export const removeFromCart = async (itemId: string): Promise<CartResponse> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      await api.delete(`/api/cart/items/${itemId}/`);
      const response = await api.get('/api/cart/');
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock cart:', error);
  }

  // Fallback to mock data
  mockCart.items = mockCart.items.filter(item => item.id !== itemId);
  return mockCart;
};

export const updateCartItem = async (itemId: string, quantity: number): Promise<CartResponse> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      await api.patch(`/api/cart/items/${itemId}/`, { quantity });
      const response = await api.get('/api/cart/');
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock cart:', error);
  }

  // Fallback to mock data
  const itemIndex = mockCart.items.findIndex(item => item.id === itemId);
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      mockCart.items.splice(itemIndex, 1);
    } else {
      mockCart.items[itemIndex].quantity = quantity;
    }
  }

  return mockCart;
};

export const clearCart = async (): Promise<void> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      await api.delete('/api/cart/');
      return;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock cart:', error);
  }

  // Fallback to mock data
  mockCart.items = [];
  mockCart.total = 0;
};