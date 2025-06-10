import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'name-a-z', label: 'Name: A to Z' },
  { value: 'name-z-a', label: 'Name: Z to A' }
];

export function SortControls() {
  const { state, dispatch } = useApp();

  const handleSortChange = (value: string) => {
    dispatch({ type: 'SET_SORT', payload: value });
  };

  return (
    <div className="relative">
      <select
        value={state.sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
    </div>
  );
}