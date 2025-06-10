import { useMemo } from 'react';
import type { FilterState, Product } from '../types';


export function useProductFiltering(products: Product[], filters: FilterState, sortBy: string) {
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchMatch = 
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!searchMatch) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const hasMatchingSize = filters.sizes.some(size => product.sizes.includes(size));
        if (!hasMatchingSize) return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasMatchingColor = filters.colors.some(color => 
          product.colors.some(productColor => 
            productColor.toLowerCase().includes(color.toLowerCase())
          )
        );
        if (!hasMatchingColor) return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          return a.isNew && !b.isNew ? -1 : !a.isNew && b.isNew ? 1 : 0;
        case 'rating':
          return b.rating - a.rating;
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters, sortBy]);

  return filteredAndSortedProducts;
}