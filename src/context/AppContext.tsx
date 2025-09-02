import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getProducts, transformProduct } from '../services/productServices';
import type { ProductFilters } from '../services/productServices';
import { getCart } from '../services/cartServices';
import { getWishlist } from '../services/wishlistServices';
import type { AppState, CartItem, FilterState, Product } from '../types';
import { useAuth } from './AuthContext';

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: { products: Product[]; total: number } }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_WISHLIST'; payload: { ids: string[]; products: Product[] } }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'CLEAR_FILTERS' };

const initialState: AppState = {
  products: [],
  filteredProducts: [],
  filters: {
    category: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    brands: [],
    searchQuery: '',
  },
  sortBy: 'featured',
  currentPage: 1,
  itemsPerPage: 1000,
  isLoading: false,
  cart: [],
  wishlist: [],
  wishlistProducts: [], // <-- add this
  totalProducts: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.products,
        filteredProducts: action.payload.products,
        totalProducts: action.payload.total,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1,
      };
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        wishlist: action.payload.ids,
        wishlistProducts: action.payload.products,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'TOGGLE_WISHLIST': {
      const isInWishlist = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    }
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        currentPage: 1,
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchWishlist: () => Promise<void>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isAuthenticated } = useAuth();

  const fetchProducts = React.useCallback(
    async (filters: ProductFilters = {}) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Call the backend API to get products
        const response = await getProducts({
          ...filters,
          page: state.currentPage,
          page_size: state.itemsPerPage,
        });
        
        dispatch({
          type: 'SET_PRODUCTS',
          payload: {
            products: response.results,
            total: response.count,
          },
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to empty array if API fails
        dispatch({
          type: 'SET_PRODUCTS',
          payload: {
            products: [],
            total: 0,
          },
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.currentPage, state.itemsPerPage, dispatch]
  );

  const fetchCart = React.useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Call the backend API to get cart data
      const cartData = await getCart();
      // Transform cart data to match your existing cart structure
const cartItems: CartItem[] = cartData.items.map(item => {
  const productPrice = Number(item.product?.price || item.product_price || 0);
  const quantity = Number(item.quantity || 1);
  
  return {
    id: item.id,
    product: {
      id: String(item.product?.id || 0),
      name: item.product?.name || item.product_name || '',
      price: productPrice,
      image: item.product?.image || item.product_image || '',
      images: item.product?.images || [item.product_image || ''].filter(Boolean),
      brand: item.product?.brand || '',
      brand_name: item.product?.brand_name || '',
      category: item.product?.category || item.product_category || '',
      subcategory: item.product?.subcategory || '',
      category_names: item.product?.category_names || [item.product_category || ''].filter(Boolean),
      color_names: item.product?.color_names || [],
      size_names: item.product?.size_names || [],
      colors: item.product?.colors || item.product_colors || [],
      sizes: item.product?.sizes || item.product_sizes || [],
      description: item.product?.description || '',
      stock: item.product?.stock || 0,
      is_new: item.product?.is_new || false,
      is_featured: item.product?.is_featured || false,
      rating: item.product?.rating || 0,
      review_count: item.product?.review_count || 0,
      tags: item.product?.tags || [],
    },
    product_name: item.product_name || item.product?.name || '',
    product_price: productPrice,
    product_image: item.product_image || item.product?.image || '',
    quantity: quantity,
    total_price: productPrice * quantity,
    added_at: item.added_at || new Date().toISOString(),
    selected_size: item.selected_size,
    selected_color: item.selected_color,
    product_sizes: item.product_sizes || item.product?.sizes || [],
    product_colors: item.product_colors || item.product?.colors || [],
    product_stock: item.product_stock || item.product?.stock || 0,
    product_category: item.product_category || item.product?.category || '',
  };
});

      dispatch({ type: 'SET_CART', payload: cartItems });
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [isAuthenticated, dispatch]);

  const fetchWishlist = React.useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      // Call the backend API to get wishlist data
      const wishlistData = await getWishlist();
      const wishlistIds = wishlistData.map(item => item.product.id.toString());
      const wishlistProducts = wishlistData.map(item => {
        // Create a complete product object with all required fields
        const productData = {
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          price: item.product.price,
          image: item.product.image,
          // Required fields with defaults
          category: 'uncategorized',
          subcategory: '',
          colors: [],
          sizes: [],
          is_new: false,
          is_featured: false,
          rating: 0,
          review_count: 0,
          description: '',
          tags: [],
          stock: 0,
          // Additional fields that might be needed
          compare_price: undefined,
          images: [item.product.image],
          color_names: [],
          size_names: [],
          category_names: []
        };
        return transformProduct(productData);
      });
      dispatch({ type: 'SET_WISHLIST', payload: { ids: wishlistIds, products: wishlistProducts } });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    }
  }, [fetchCart, fetchWishlist, isAuthenticated]);

  // Fetch products when filters or sorting changes
  useEffect(() => {
    const filters: ProductFilters = {
      search: state.filters.searchQuery,
      category: state.filters.category.length > 0 ? state.filters.category[0] : undefined,
      min_price: state.filters.priceRange[0],
      max_price: state.filters.priceRange[1],
      ordering: state.sortBy === 'price-low-high' ? 'price' : 
                state.sortBy === 'price-high-low' ? '-price' :
                state.sortBy === 'newest' ? '-created_at' :
                state.sortBy === 'rating' ? '-rating' :
                state.sortBy === 'name-a-z' ? 'name' :
                state.sortBy === 'name-z-a' ? '-name' : undefined,
      page: state.currentPage,
    };

    fetchProducts(filters);
  }, [state.filters, state.sortBy, state.currentPage, fetchProducts]);

  return (
    <AppContext.Provider value={{ state, dispatch, fetchProducts, fetchCart, fetchWishlist }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {  
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}