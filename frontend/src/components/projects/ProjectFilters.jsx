import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect } from 'react';

const categories = [
  'Web Development', 'Mobile App', 'Machine Learning', 'Data Science',
  'DevOps', 'Game Development', 'UI/UX Design', 'Blockchain', 'IoT', 'Other',
];

export default function ProjectFilters({ onChange }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const debouncedQ = useDebounce(q, 400);

  useEffect(() => {
    onChange({ q: debouncedQ, category, sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, category, sort]);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search projects, tags, tech…"
        className="flex-1 rounded-md border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-ember-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-ember-500"
      >
        <option value="">All categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-ember-500"
      >
        <option value="newest">Newest</option>
        <option value="trending">Trending</option>
        <option value="mostCommented">Most discussed</option>
      </select>
    </div>
  );
}
