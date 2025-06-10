import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, Tag, Percent } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/Filters/FilterSidebar';
import { ProductGrid } from '../components/Products/ProductGrid';
import { SortControls } from '../components/Controls/SortControls';
import { Pagination } from '../components/Controls/Pagination';
import { useProductFiltering } from '../hooks/useProductFiltering';

export function ClearancePage() {
  const { state } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products to show only clearance items (products with compareAtPrice)
  const clearanceProducts = state.products.filter(product => 
    product.compareAtPrice && product.compareAtPrice > product.price
  );

  const filteredProducts = useProductFiltering(clearanceProducts, state.filters, state.sortBy);
  
  // Calculate total savings
  const totalSavings = clearanceProducts.reduce((total, product) => {
    if (product.compareAtPrice) {
      return total + (product.compareAtPrice - product.price);
    }
    return total;
  }, 0);

  // Calculate average discount percentage
  const averageDiscount = clearanceProducts.length > 0 
    ? Math.round(clearanceProducts.reduce((total, product) => {
        if (product.compareAtPrice) {
          return total + ((product.compareAtPrice - product.price) / product.compareAtPrice * 100);
        }
        return total;
      }, 0) / clearanceProducts.length)
    : 0;

  // Pagination
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Close mobile filter on resize
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
      {/* Clearance Banner */}
      <div className="bg-gradient-to-r from-deep-blue to-primary text-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Tag className="mr-3" size={32} />
              Clearance Sale
            </h1>
            <p className="text-lg opacity-90">
              Incredible deals on premium products - Limited time offers!
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-2xl font-bold mb-1">
              <Percent className="mr-2" size={24} />
              Up to {averageDiscount}% OFF
            </div>
            <div className="text-sm opacity-80">
              Total savings available: ${totalSavings.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Clearance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-primary">{clearanceProducts.length}</div>
          <div className="text-sm text-gray-600">Items on Sale</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-deep-blue">{averageDiscount}%</div>
          <div className="text-sm text-gray-600">Average Discount</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">${totalSavings.toFixed(0)}</div>
          <div className="text-sm text-gray-600">Total Savings</div>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Clearance Products</h2>
        <p className="text-gray-600">Don't miss out on these amazing deals - while supplies last!</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <FilterSidebar 
          isOpen={isFilterOpen} 
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
              
              <div className="text-sm text-gray-600">
                {filteredProducts.length} clearance item{filteredProducts.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>

              <SortControls />
            </div>
          </div>

          {/* Special Clearance Notice */}
          {filteredProducts.length === 0 && clearanceProducts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Tag className="text-yellow-600 mr-2" size={20} />
                <div>
                  <h3 className="font-medium text-yellow-800">No clearance items match your current filters</h3>
                  <p className="text-sm text-yellow-700">Try adjusting your filters to see more clearance deals</p>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid 
            products={paginatedProducts} 
            isLoading={state.isLoading} 
          />

          {/* Pagination */}
          <Pagination totalItems={filteredProducts.length} />

          {/* Clearance Terms */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Clearance Sale Terms</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All clearance sales are final - no returns or exchanges</li>
              <li>• Limited quantities available while supplies last</li>
              <li>• Prices are subject to change without notice</li>
              <li>• Cannot be combined with other offers or discounts</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}