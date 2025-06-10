export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
}

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  brands: string[];
  searchQuery: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface AppState {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  sortBy: string;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  cart: CartItem[];
  wishlist: string[];
}