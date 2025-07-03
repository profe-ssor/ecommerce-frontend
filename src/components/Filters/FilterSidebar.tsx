import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  fetchAllFilterOptions,
  type Brand,
  type Category,
  type Color,
  type Size,
} from '../../services/filterApi';

interface FilterOptions {
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  brands: Brand[];
}

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  categoryFilter?: string;
}

export function FilterSidebar({ isOpen, onToggle, categoryFilter }: FilterSidebarProps) {
  const { state, dispatch } = useApp();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'category',
    'sizes',
    'colors',
  ]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    sizes: [],
    colors: [],
    brands: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilterOptions = async () => {
      setLoading(true);
      try {
        const options = await fetchAllFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Error loading filter options:', error);
        setFilterOptions({
          categories: [],
          sizes: [],
          colors: [],
          brands: [],
        });
      } finally {
        setLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    const filterKey = filterType === 'categories' ? 'category' : filterType;
    const currentFilters = state.filters[filterKey] as string[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];

    dispatch({
      type: 'SET_FILTERS',
      payload: { [filterKey]: newFilters },
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { priceRange: [min, max] },
    });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const hasActiveFilters =
    state.filters.category.length > 0 ||
    state.filters.sizes.length > 0 ||
    state.filters.colors.length > 0 ||
    state.filters.brands.length > 0 ||
    state.filters.searchQuery.length > 0;

  const FilterCheckbox = ({
    filterType,
    value,
    label,
  }: {
    filterType: keyof FilterOptions;
    value: string;
    label: string;
  }) => {
    const filterKey = filterType === 'categories' ? 'category' : filterType;
    const isChecked = (state.filters[filterKey] as string[]).includes(value);

    return (
      <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleFilterChange(filterType, value)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  };

  const ColorFilterCheckbox = ({ color }: { color: Color }) => {
    const isChecked = state.filters.colors.includes(color.name);

    return (
      <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleFilterChange('colors', color.name)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <div className="flex items-center space-x-2">
          {color.hex_code && (
            <div
              className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
              style={{
                backgroundColor: color.hex_code,
                border:
                  color.hex_code === '#FFFFFF'
                    ? '1px solid #D1D5DB'
                    : `1px solid ${color.hex_code}`,
              }}
            />
          )}
          <span className="text-sm text-gray-700">{color.name}</span>
        </div>
      </label>
    );
  };

  const getFilteredCategories = () => {
    if (!categoryFilter) return filterOptions.categories;

    return filterOptions.categories.filter(category => {
      if (categoryFilter === 'Dresses') {
        return category.name === 'Dresses';
      } else if (categoryFilter === 'Women') {
        return ['Women', 'Dresses', 'Beauty & Accessories'].includes(category.name);
      } else if (categoryFilter === 'Men') {
        return category.name === 'Men';
      } else if (categoryFilter === 'Beauty & Accessories') {
        return category.name === 'Beauty & Accessories';
      } else if (categoryFilter === 'Kids & Baby') {
        return category.name === 'Kids & Baby';
      } else if (categoryFilter === 'Home') {
        return category.name === 'Home';
      }else if(category.name == 'African Wear'){
        return category.name == 'African Wear';
      }
      return true;
    });
  };

  if (loading) {
    return (
      <div className="fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white z-50 lg:z-0 w-80 lg:w-64 border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white z-50 lg:z-0
        w-80 lg:w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-200 overflow-y-auto
      `}
      >
        <div className="p-6">
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
              <button onClick={onToggle} className="lg:hidden p-1 hover:bg-gray-100 rounded">
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
                        onClick={() => handleFilterChange(key as keyof FilterOptions, value)}
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
          {[
            { key: 'category', label: 'Categories', items: getFilteredCategories(), type: 'categories' },
            { key: 'sizes', label: 'Sizes', items: filterOptions.sizes, type: 'sizes' },
            { key: 'colors', label: 'Colors', items: filterOptions.colors, type: 'colors' },
            { key: 'brands', label: 'Brands', items: filterOptions.brands, type: 'brands' },
          ].map(({ key, label, items, type }) => (
            <div key={key} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection(key)}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
              >
                <span>{label}</span>
                {expandedSections.includes(key) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.includes(key) && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {key === 'colors'
                    ? (items as Color[]).map(color => (
                        <ColorFilterCheckbox key={color.id} color={color} />
                      ))
                    : (
                        (
                          (type === 'categories'
                            ? (items as Category[])
                            : type === 'sizes'
                            ? (items as Size[])
                            : type === 'brands'
                            ? (items as Brand[])
                            : []) // fallback empty array for safety
                        ).map(item => (
                          <FilterCheckbox
                            key={item.id}
                            filterType={type as keyof FilterOptions}
                            value={item.name}
                            label={item.name}
                          />
                        ))
                      )}
                </div>
              )}
            </div>
          ))}

          {/* Price Range */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-primary transition-colors"
            >
              <span>Price Range</span>
              {expandedSections.includes('price') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSections.includes('price') && (
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={state.filters.priceRange[0]}
                    onChange={e =>
                      handlePriceRangeChange(parseInt(e.target.value) || 0, state.filters.priceRange[1])
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={state.filters.priceRange[1]}
                    onChange={e =>
                      handlePriceRangeChange(state.filters.priceRange[0], parseInt(e.target.value) || 1000)
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
