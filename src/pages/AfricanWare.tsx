import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/Filters/FilterSidebar';
import { ProductGrid } from '../components/Products/ProductGrid';
import { SortControls } from '../components/Controls/SortControls';
import { Pagination } from '../components/Controls/Pagination';
import { useProductFiltering } from '../hooks/useProductFiltering';

export function AfricanWare() {
  const { state } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const africanWearProducts = state.products.filter(product =>
    product.category_names?.includes('African Wear') ||
    product.tags.some(tag =>
      ['african', 'wear', 'west'].includes(tag.toLowerCase())
    )
  );

  const filteredProducts = useProductFiltering(
    africanWearProducts,
    state.filters,
    state.sortBy
  );

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
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-buttershine">Made in Africa</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Authentic African craftsmanship and traditional designs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/african"
              className="bg-white bg-opacity-20 text-custom-red px-6 py-3 rounded-full font-medium hover:bg-opacity-30 transition-all"
            >
              All Products
            </Link>
            <Link
              to="/african"
              className="bg-white bg-opacity-20 text-custom-red px-6 py-3 rounded-full font-medium hover:bg-opacity-30 transition-all"
            >
              Textiles
            </Link>
            <Link
              to="/african"
              className="bg-white bg-opacity-20 text-custom-red px-6 py-3 rounded-full font-medium hover:bg-opacity-30 transition-all"
            >
              Jewelry
            </Link>
            <Link
              to="/african"
              className="bg-white bg-opacity-20 text-custom-red px-6 py-3 rounded-full font-medium hover:bg-opacity-30 transition-all"
            >
              Home Decor
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-buttershine">African Artisan Collection</h2>
          <p className="text-gray-600">Discover authentic African craftsmanship and traditional designs perfect for every occasion.</p>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            categoryFilter="African Wear"
          />
          <div className="flex-1 min-w-0">
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
                  {filteredProducts.length} product(s) found
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
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
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose African Goods?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Craftsmanship</h3>
              <p className="text-gray-600">Handcrafted by skilled artisans using traditional techniques passed down through generations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Designs</h3>
              <p className="text-gray-600">Each piece tells a story with distinctive patterns and cultural significance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Trade</h3>
              <p className="text-gray-600">Supporting local communities and ensuring fair compensation for artisans.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
