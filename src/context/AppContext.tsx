import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockProducts } from '../data/mockProducts';
import type { AppState, CartItem, FilterState, Product } from '../types';
import { useAuth } from './AuthContext';

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: { products: Product[]; total: number } }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_WISHLIST'; payload: string[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'CLEAR_FILTERS' };

const initialState: AppState = {
  products: [],
  filteredProducts: [],
  filters: {
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    brands: [],
    searchQuery: '',
  },
  sortBy: 'featured',
  currentPage: 1,
  itemsPerPage: 12,
  isLoading: false,
  cart: [],
  wishlist: [],
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
        wishlist: action.payload,
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
  fetchProducts: (filters?: any) => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchWishlist: () => Promise<void>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isAuthenticated } = useAuth();

  const fetchProducts = React.useCallback(
    async (filters: any = {}) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredProducts = [...mockProducts];
        
        // Apply search filter
        if (filters.search) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
        
        // Apply category filter
        if (filters.category) {
          filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === filters.category.toLowerCase()
          );
        }
        
        // Apply price range filter
        if (filters.min_price !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.price >= filters.min_price
          );
        }
        
        if (filters.max_price !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.price <= filters.max_price
          );
        }
        
        // Apply sorting
        if (filters.ordering) {
          switch (filters.ordering) {
            case 'price':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case '-price':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'name':
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case '-name':
              filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
              break;
            case '-created_at':
              // For mock data, we'll just reverse the array
              filteredProducts.reverse();
              break;
            case '-rating':
              filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              break;
          }
        }
        
        // Apply pagination
        const page = filters.page || 1;
        const pageSize = state.itemsPerPage;
        const startIndex = (page - 1) * pageSize;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
        
        dispatch({
          type: 'SET_PRODUCTS',
          payload: {
            products: paginatedProducts,
            total: filteredProducts.length,
          },
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.itemsPerPage, dispatch]
  );

  const fetchCart = React.useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Mock cart data - in a real app this would come from an API
      const mockCartItems: CartItem[] = [];
      dispatch({ type: 'SET_CART', payload: mockCartItems });
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [isAuthenticated, dispatch]);

  const fetchWishlist = React.useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Mock wishlist data - in a real app this would come from an API
      const mockWishlistIds: string[] = [];
      dispatch({ type: 'SET_WISHLIST', payload: mockWishlistIds });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    }
  }, [fetchCart, fetchWishlist, isAuthenticated]);

  // Fetch products when filters or sorting changes
  useEffect(() => {
    const filters: any = {
      search: state.filters.searchQuery,
      category: state.filters.categories.length > 0 ? state.filters.categories[0] : undefined,
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