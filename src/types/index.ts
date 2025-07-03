export interface Product {
  id: string;
  name: string;
  brand: string;
  brand_name?: string;
  category_names: string[];
  price: number;
  compare_price?: number;
  image: string;
  images: string[];
  color_names: string[];
  size_names: string[];
  category: string;
  subcategory: string;
  colors: string[];
  sizes: string[];
  is_new: boolean;
  is_featured: boolean;
  rating: number;
  review_count: number;
  description: string;
  tags: string[];
  stock: number;
}

export interface FilterState {
  category: string[];
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
  id: number;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  product_name: string;
  product_price: number | string;
  product_image: string;
  total_price: number | string;
  added_at: string;
  selected_size?: string;
  selected_color?: string;
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
  totalProducts: number;
}

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