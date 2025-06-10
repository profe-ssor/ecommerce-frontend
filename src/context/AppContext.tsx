import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { mockProducts } from '../data/mockProducts';
import type { AppState, CartItem, FilterState, Product } from '../types';

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
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
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
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
    case 'TOGGLE_WISHLIST':
      { const isInWishlist = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload],
      }; }
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
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Simulate API call
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 500);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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