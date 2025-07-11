import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PaginationProps {
  totalItems: number;
}

export function Pagination({ totalItems }: PaginationProps) {
  const { state, dispatch } = useApp();
  const totalPages = Math.ceil(totalItems / state.itemsPerPage);
  
  if (totalPages <= 1) return null;

  const currentPage = state.currentPage;
  const pages = [];

  // Calculate which pages to show
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Adjust if we're near the beginning or end
  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  }
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: page });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronLeft size={16} className="mr-1" />
        Previous
      </button>

      {/* First page and ellipsis */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => goToPage(1)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 py-2 text-sm text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-2 text-sm font-medium rounded-lg ${
            page === currentPage
              ? 'text-white bg-primary border border-primary'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page and ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-2 text-sm text-gray-500">...</span>
          )}
          <button
            onClick={() => goToPage(totalPages)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        Next
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
}