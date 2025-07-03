import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/Filters/FilterSidebar';
import { ProductGrid } from '../components/Products/ProductGrid';
import { SortControls } from '../components/Controls/SortControls';
import { Pagination } from '../components/Controls/Pagination';
import { useProductFiltering } from '../hooks/useProductFiltering';

export function KidsBabyPage() {
  const { state } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const kidsBabyProducts = state.products.filter(product =>
    product.category_names?.includes('Kids & Baby') ||
    product.tags.some(tag =>
      ['kids', 'baby', 'children'].includes(tag.toLowerCase())
    )
  );

  const filteredProducts = useProductFiltering(kidsBabyProducts, state.filters, state.sortBy);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kids & Baby</h1>
        <p className="text-gray-600">Everything cute and essential for kids and babies.</p>
      </div>

      <div className="flex gap-8">
        <FilterSidebar isOpen={isFilterOpen} onToggle={() => setIsFilterOpen(!isFilterOpen)} categoryFilter="Kids & Baby" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                <span>Filters</span>
              </button>
              <div className="text-sm text-gray-600">{filteredProducts.length} product(s) found</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Grid size={16} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}>
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
