import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[3/4] bg-gray-200" />
      <div className="p-4">
        <div className="h-3 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-3 w-8 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
        <div className="flex space-x-1 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}