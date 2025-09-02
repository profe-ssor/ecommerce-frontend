import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/Filters/FilterSidebar';
import { ProductGrid } from '../components/Products/ProductGrid';
import { SortControls } from '../components/Controls/SortControls';
import { Pagination } from '../components/Controls/Pagination';
import { useProductFiltering } from '../hooks/useProductFiltering';
import { getCategories } from '../services/productServices';

interface Category {
  id: number;
  name: string;
  description?: string;
}

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { state } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategories();
        const foundCategory = categories.find((cat: Category) => cat.id === Number(categoryId));
        setCategory(foundCategory || null);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  // Filter products by category ID
  const categoryProducts = state.products.filter(product => {
    // Check if product belongs to this category
    return product.category?.toLowerCase() === category?.name?.toLowerCase() ||
           product.category_names?.some((cat: string) => cat.toLowerCase() === category?.name?.toLowerCase()) ||
           product.tags.some((tag: string) => tag.toLowerCase().includes(category?.name?.toLowerCase() || ''));
  });

  const filteredProducts = useProductFiltering(categoryProducts, state.filters, state.sortBy);

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

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category...</p>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
          categoryFilter={category.name}
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