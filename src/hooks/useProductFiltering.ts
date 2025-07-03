import { useMemo } from 'react';
import type { FilterState, Product } from '../types';

export function useProductFiltering(products: Product[], filters: FilterState, sortBy: string) {
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const query = filters.searchQuery.toLowerCase();

      // 🔍 Search
      if (filters.searchQuery) {
        const match =
          product.name.toLowerCase().includes(query) ||
          product.brand_name?.toLowerCase().includes(query) || // ✅ brand_name
          product.description?.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query));
        if (!match) return false;
      }

      // ✅ Category filter
      if (filters.category.length > 0) {
        const match = filters.category.some(cat =>
          product.category_names?.includes(cat)
        );
        if (!match) return false;
      }

      // ✅ Sizes filter
      if (filters.sizes.length > 0) {
        const match = filters.sizes.some(size =>
          product.size_names?.includes(size)
        );
        if (!match) return false;
      }

      // ✅ Colors filter
      if (filters.colors.length > 0) {
        const match = filters.colors.some(filterColor =>
          product.color_names?.some(prodColor =>
            prodColor.toLowerCase().trim() === filterColor.toLowerCase().trim()
          )
        );
        if (!match) return false;
      }

      // ✅ Brands filter
      if (filters.brands.length > 0) {
        const brandName = product.brand_name?.toLowerCase().trim();
        const match = filters.brands.some(filterBrand =>
          filterBrand.toLowerCase().trim() === brandName
        );
        if (!match) return false;
      }

      // ✅ Price Range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // 🧠 Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return b.rating - a.rating;
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          return a.is_new && !b.is_new ? -1 : !a.is_new && b.is_new ? 1 : 0;
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
