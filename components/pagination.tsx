'use client';

export default function Pagination({ pagination, onPage }: any) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pagination.previous_page < 1}
        onClick={() => onPage(pagination.previous_page)}
      >
        Previous
      </button>

      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pagination.next_page > pagination.total_pages}
        onClick={() => onPage(pagination.next_page)}
      >
        Next
      </button>
    </div>
  );
}
