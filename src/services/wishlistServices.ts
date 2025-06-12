import { api } from './api';

export interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
  };
  created_at: string;
}

export const getWishlist = async (): Promise<WishlistItem[]> => {
  try {
    const response = await api.get('/api/wishlist/');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const addToWishlist = async (productId: number): Promise<WishlistItem> => {
  try {
    const response = await api.post('/api/wishlist/add/', {
      product_id: productId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (productId: number): Promise<void> => {
  try {
    await api.delete(`/api/wishlist/remove/${productId}/`);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

export const isInWishlist = async (productId: number): Promise<boolean> => {
  try {
    const response = await api.get(`/api/wishlist/check/${productId}/`);
    return response.data.in_wishlist;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

// Get wishlist item count
export const getWishlistItemCount = async (): Promise<number> => {
  try {
    const response = await api.get('/api/wishlist/count/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching wishlist count:', error);
    return 0;
  }
};