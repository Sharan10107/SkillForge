import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { usePagination } from '../hooks/usePagination';
import { getProjects } from '../api/project.api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilters from '../components/projects/ProjectFilters';
import Pagination from '../components/shared/Pagination';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

export default function ExploreProjects() {
  const [filters, setFilters] = useState({ q: '', category: '', sort: 'newest' });
  const { page, setPage } = usePagination();
  const { data, loading } = useFetch(
    () => getProjects({ ...filters, page }).then((r) => r.data.data),
    [filters.q, filters.category, filters.sort, page]
  );

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-display text-3xl text-ink">Explore projects</h1>
        <p className="mb-6 text-ink-muted">Real work from students, filtered your way.</p>
        <ProjectFilters onChange={setFilters} />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
          </div>
        ) : data?.projects?.length ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((p) => <ProjectCard key={p._id} project={p} />)}
            </div>
            <Pagination meta={data.meta} onPageChange={setPage} />
          </>
        ) : (
          <EmptyState title="No projects match those filters" description="Try a different category or search term." />
        )}
      </div>
      <Footer />
    </div>
  );
}
