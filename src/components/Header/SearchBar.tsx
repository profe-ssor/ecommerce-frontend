import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SearchBar() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState(state.filters.searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_FILTERS',
        payload: { searchQuery: query }
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}