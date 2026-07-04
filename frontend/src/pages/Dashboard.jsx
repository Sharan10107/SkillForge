import { FiFolder, FiHeart, FiEye, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getMyProjects } from '../api/project.api';
import StatCard from '../components/shared/StatCard';
import ProjectCard from '../components/projects/ProjectCard';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading } = useFetch(() => getMyProjects({ limit: 3 }).then((r) => r.data.data));

  const totals = (data?.projects || []).reduce(
    (acc, p) => ({
      likes: acc.likes + (p.likesCount || 0),
      views: acc.views + (p.viewsCount || 0),
    }),
    { likes: 0, views: 0 }
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl text-ink">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-ink-muted">Here's how your portfolio is doing.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Projects" value={data?.meta?.totalItems ?? '—'} icon={FiFolder} accent />
        <StatCard label="Total likes" value={totals.likes} icon={FiHeart} />
        <StatCard label="Total views" value={totals.views} icon={FiEye} />
        <StatCard label="Bookmarks made" value="—" icon={FiBookmark} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-ink">Recent projects</h2>
          <Link to="/dashboard/projects/new"><Button size="sm">New project</Button></Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
          </div>
        ) : data?.projects?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {data.projects.map((p) => <ProjectCard key={p._id} project={{ ...p, owner: user }} />)}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            description="Publish your first project to start building your portfolio."
            action={<Link to="/dashboard/projects/new"><Button>Create your first project</Button></Link>}
          />
        )}
      </div>
    </div>
  );
}
