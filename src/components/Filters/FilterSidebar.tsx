import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FilterSection {
  title: string;
  key: keyof typeof filterOptions;
  options: string[];
}

const filterOptions = {
  categories: ['Dresses', 'Women', 'Men', 'Beauty & Accessories', 'Kids & Baby', 'Home'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2T', '3T', '4T', '5T', '6T', '7', '8', '9', '10', '11', '12'],
  colors: ['Black', 'White', 'Gray', 'Navy', 'Brown', 'Pink', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Orange'],
  brands: ['Elegant Couture', 'Luxury Knits', 'Luxury Leather Co.', 'EcoWear', 'Pure Beauty', 'Professional Wear']
};

// Color mapping for visual representation
const colorMap: { [key: string]: string } = {
  'Black': '#000000',
  'White': '#FFFFFF',
  'Gray': '#6B7280',
  'Navy': '#1E3A8A',
  'Brown': '#92400E',
  'Pink': '#EC4899',
  'Blue': '#3B82F6',
  'Red': '#EF4444',
  'Green': '#10B981',
  'Yellow': '#F59E0B',
  'Purple': '#8B5CF6',
  'Orange': '#F97316'
};

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  categoryFilter?: string;
}

export function FilterSidebar({ isOpen, onToggle, categoryFilter }: FilterSidebarProps) {
  const { state, dispatch } = useApp();
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'sizes', 'colors']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleFilterChange = (filterType: keyof typeof filterOptions, value: string) => {
    const currentFilters = state.filters[filterType] as string[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];

    dispatch({
      type: 'SET_FILTERS',
      payload: { [filterType]: newFilters }
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { priceRange: [min, max] }
    });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const hasActiveFilters = 
    state.filters.categories.length > 0 ||
    state.filters.sizes.length > 0 ||
    state.filters.colors.length > 0 ||
    state.filters.brands.length > 0 ||
    state.filters.searchQuery.length > 0;

  const FilterCheckbox = ({ filterType, value }: { filterType: keyof typeof filterOptions; value: string }) => {
    const isChecked = (state.filters[filterType] as string[]).includes(value);
    
    return (
      <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleFilterChange(filterType, value)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm text-gray-700">{value}</span>
      </label>
    );
  };

  const ColorFilterCheckbox = ({ value }: { value: string }) => {
    const isChecked = state.filters.colors.includes(value);
    const colorValue = colorMap[value] || '#D1D5DB';
    
    return (
      <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleFilterChange('colors', value)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
            style={{ 
              backgroundColor: colorValue,
              border: value === 'White' ? '1px solid #D1D5DB' : `1px solid ${colorValue}`
            }}
          />
          <span className="text-sm text-gray-700">{value}</span>
        </div>
      </label>
    );
  };

  // Filter categories based on current page
  const getFilteredCategories = () => {
    if (categoryFilter === 'Dresses') {
      return ['Dresses'];
    } else if (categoryFilter === 'Women') {
      return ['Women', 'Dresses', 'Beauty & Accessories'];
    } else if (categoryFilter === 'Men') {
      return ['Men'];
    } else if (categoryFilter === 'Beauty & Accessories') {
      return ['Beauty & Accessories'];
    } else if (categoryFilter === 'Kids & Baby') {
      return ['Kids & Baby'];
    } else if (categoryFilter === 'Home') {
      return ['Home'];
    }
    return filterOptions.categories;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white z-50 lg:z-0
        w-80 lg:w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-200 overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onToggle}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(state.filters).map(([key, values]) => {
                  if (key === 'priceRange' || key === 'searchQuery') return null;
                  return (values as string[]).map(value => (
                    <span
                      key={`${key}-${value}`}
                      className="inline-flex items-center px-2 py-1 bg-primary-light text-primary text-xs rounded-full"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterChange(key as keyof typeof filterOptions, value)}
                        className="ml-1 hover:text-primary-dark"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ));
                })}
              </div>
            </div>
          )}

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('categories')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
              >
                <span>Categories</span>
                {expandedSections.includes('categories') ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {expandedSections.includes('categories') && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {getFilteredCategories().map(category => (
                    <FilterCheckbox
                      key={category}
                      filterType="categories"
                      value={category}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('sizes')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
              >
                <span>Sizes</span>
                {expandedSections.includes('sizes') ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {expandedSections.includes('sizes') && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {filterOptions.sizes.map(size => (
                    <FilterCheckbox
                      key={size}
                      filterType="sizes"
                      value={size}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Colors */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('colors')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
              >
                <span>Colors</span>
                {expandedSections.includes('colors') ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {expandedSections.includes('colors') && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {filterOptions.colors.map(color => (
                    <ColorFilterCheckbox
                      key={color}
                      value={color}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Brands */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('brands')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
              >
                <span>Brands</span>
                {expandedSections.includes('brands') ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {expandedSections.includes('brands') && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {filterOptions.brands.map(brand => (
                    <FilterCheckbox
                      key={brand}
                      filterType="brands"
                      value={brand}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
              >
                <span>Price Range</span>
                {expandedSections.includes('price') ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {expandedSections.includes('price') && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={state.filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(
                        parseInt(e.target.value) || 0,
                        state.filters.priceRange[1]
                      )}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={state.filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(
                        state.filters.priceRange[0],
                        parseInt(e.target.value) || 1000
                      )}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}