import { api } from './api';

export interface WishlistItem {
  id: string;
  product: string;
  created_at: string;
}

// Mock wishlist data for fallback
let mockWishlist: WishlistItem[] = [];

// Check if backend is available
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    await api.get('/api/health/', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
};

export const getWishlist = async (): Promise<WishlistItem[]> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await api.get('/api/wishlist/');
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock wishlist:', error);
  }

  // Fallback to mock data
  return mockWishlist;
};

export const addToWishlist = async (productId: string): Promise<WishlistItem> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await api.post('/api/wishlist/', {
        product: productId,
      });
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock wishlist:', error);
  }

  // Fallback to mock data
  const newItem: WishlistItem = {
    id: `mock-wishlist-${Date.now()}`,
    product: productId,
    created_at: new Date().toISOString(),
  };
  
  mockWishlist.push(newItem);
  return newItem;
};

export const removeFromWishlist = async (productId: string): Promise<void> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      await api.delete(`/api/wishlist/${productId}/`);
      return;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock wishlist:', error);
  }

  // Fallback to mock data
  mockWishlist = mockWishlist.filter(item => item.product !== productId);
};