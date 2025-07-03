import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/Filters/FilterSidebar';
import { ProductGrid } from '../components/Products/ProductGrid';
import { SortControls } from '../components/Controls/SortControls';
import { Pagination } from '../components/Controls/Pagination';
import { useProductFiltering } from '../hooks/useProductFiltering';

export function BeautyAccessoriesPage() {
  const { state } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter beauty and accessories products
  const beautyAccessories = state.products.filter(product =>
    product.category?.toLowerCase() === 'beauty & accessories' ||
    product.category_names?.some(cat => cat.toLowerCase() === 'beauty & accessories') ||
    product.subcategory?.toLowerCase().includes('beauty') ||
    product.subcategory?.toLowerCase().includes('accessories') ||
    product.tags.some(tag => ['beauty', 'makeup', 'accessory', 'skincare', 'watch', 'jewelry', 'handbag', 'sunglasses'].includes(tag.toLowerCase()))
  );

  const filteredProducts = useProductFiltering(beautyAccessories, state.filters, state.sortBy);

  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Beauty & Accessories</h1>
        <p className="text-gray-600">Discover premium beauty products and stylish accessories</p>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
          categoryFilter="Beauty & Accessories"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>

              <div className="text-sm text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'}`}>
                  <Grid size={16} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'}`}>
                  <List size={16} />
                </button>
              </div>
              <SortControls />
            </div>
          </div>

          <ProductGrid products={paginatedProducts} isLoading={state.isLoading} />
          <Pagination totalItems={filteredProducts.length} />
        </div>
      </div>
    </main>
  );
}
