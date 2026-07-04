import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { useFetch } from '../hooks/useFetch';
import { usePagination } from '../hooks/usePagination';
import { getMyProjects } from '../api/project.api';
import ProjectCard from '../components/projects/ProjectCard';
import Pagination from '../components/shared/Pagination';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function MyProjects() {
  const { user } = useAuth();
  const { page, setPage } = usePagination();
  const { data, loading } = useFetch(() => getMyProjects({ page }).then((r) => r.data.data), [page]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">My projects</h1>
        <Link to="/dashboard/projects/new"><Button size="sm"><FiPlus /> New project</Button></Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
        </div>
      ) : data?.projects?.length ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((p) => (
              <div key={p._id} className="relative">
                <ProjectCard project={{ ...p, owner: user }} />
                <Link to={`/dashboard/projects/${p._id}/edit`} className="absolute right-3 top-3 rounded-full bg-surface px-3 py-1 text-xs shadow-soft">
                  Edit
                </Link>
              </div>
            ))}
          </div>
          <Pagination meta={data.meta} onPageChange={setPage} />
        </>
      ) : (
        <EmptyState
          title="No projects yet"
          description="Your published and draft projects will show up here."
          action={<Link to="/dashboard/projects/new"><Button>Create a project</Button></Link>}
        />
      )}
    </div>
  );
}
