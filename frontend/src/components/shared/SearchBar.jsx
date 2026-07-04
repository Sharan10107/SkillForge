import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" size={16} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ember-500"
      />
    </div>
  );
}
