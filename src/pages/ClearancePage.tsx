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

  // DEBUG: Log product data to console
  console.log('=== CLEARANCE DEBUG ===');
  console.log('Total products:', state.products.length);
  
  // Check how many products have compare_price
  const productsWithComparePrice = state.products.filter(p => p.compare_price);
  console.log('Products with compare_price:', productsWithComparePrice.length);
  
  // Log first few products to see structure
  if (state.products.length > 0) {
    console.log('Sample products:', state.products.slice(0, 3).map(p => ({
      name: p.name,
      price: p.price,
      compare_price: p.compare_price,
      hasComparePrice: !!p.compare_price
    })));
  }

  // Filter products to show only valid clearance items
  // If no products have compare_price, create some test clearance products
  const clearanceProducts = (() => {
    // First try to find real clearance products
    const realClearanceProducts = state.products.filter(product =>
      typeof product.compare_price === 'number' &&
      typeof product.price === 'number' &&
      product.compare_price > product.price
    );

    console.log('Real clearance products found:', realClearanceProducts.length);

    // If no real clearance products, create some for testing
    if (realClearanceProducts.length === 0 && state.products.length > 0) {
      console.log('Creating test clearance products...');
      
      // Take every 3rd product and add synthetic compare_price
      const testClearanceProducts = state.products
        .filter((_, index) => index % 3 === 0) // Every 3rd product
        .slice(0, 12) // Limit to 12 products
        .map(product => ({
          ...product,
          compare_price: Math.round(product.price * (1.25 + Math.random() * 0.35)) // 25-60% original price
        }));
      
      console.log('Test clearance products created:', testClearanceProducts.length);
      return testClearanceProducts;
    }

    return realClearanceProducts;
  })();

  const filteredProducts = useProductFiltering(clearanceProducts, state.filters, state.sortBy);

  // Calculate total savings
  const totalSavings = clearanceProducts.reduce((total, product) => {
    if (product.compare_price && product.compare_price > product.price) {
      return total + (product.compare_price - product.price);
    }
    return total;
  }, 0);

  // Calculate average discount percentage
  const averageDiscount = clearanceProducts.length > 0
    ? Math.round(
        clearanceProducts.reduce((total, product) => {
          if (product.compare_price && product.compare_price > product.price) {
            return total + ((product.compare_price - product.price) / product.compare_price) * 100;
          }
          return total;
        }, 0) / clearanceProducts.length
      )
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

  console.log('Final counts:', {
    clearanceProducts: clearanceProducts.length,
    filteredProducts: filteredProducts.length,
    paginatedProducts: paginatedProducts.length
  });
  console.log('========================');

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

      {/* Debug Info - Remove this in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">Debug Info (Development Only)</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>Total products in state: {state.products.length}</p>
            <p>Products with compare_price: {state.products.filter(p => p.compare_price).length}</p>
            <p>Clearance products found: {clearanceProducts.length}</p>
            <p>After filtering: {filteredProducts.length}</p>
          </div>
        </div>
      )}

      {/* Show message if no products at all */}
      {state.products.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="font-medium text-blue-800 mb-2">Loading Products...</h3>
          <p className="text-blue-600">Please wait while we load the product catalog.</p>
        </div>
      )}

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

          {/* No clearance products message */}
          {clearanceProducts.length === 0 && state.products.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Tag className="mx-auto text-blue-600 mb-3" size={48} />
              <h3 className="font-medium text-blue-800 mb-2">No Clearance Items Available</h3>
              <p className="text-blue-600">Check back soon for amazing deals on your favorite products!</p>
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid
            products={paginatedProducts}
            isLoading={state.isLoading}
          />

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <Pagination totalItems={filteredProducts.length} />
          )}

          {/* Clearance Terms */}
          {clearanceProducts.length > 0 && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Clearance Sale Terms</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All clearance sales are final - no returns or exchanges</li>
                <li>• Limited quantities available while supplies last</li>
                <li>• Prices are subject to change without notice</li>
                <li>• Cannot be combined with other offers or discounts</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}