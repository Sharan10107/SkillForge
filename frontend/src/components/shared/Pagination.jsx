import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.totalPages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        disabled={!meta.hasPrevPage}
        onClick={() => onPageChange(meta.page - 1)}
        className="rounded-md border border-border p-2 disabled:opacity-40"
      >
        <FiChevronLeft />
      </button>
      <span className="font-mono text-sm text-ink-muted">
        Page {meta.page} of {meta.totalPages}
      </span>
      <button
        disabled={!meta.hasNextPage}
        onClick={() => onPageChange(meta.page + 1)}
        className="rounded-md border border-border p-2 disabled:opacity-40"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
