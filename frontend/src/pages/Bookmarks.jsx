import { useFetch } from '../hooks/useFetch';
import { getMyBookmarks } from '../api/bookmark.api';
import ProjectCard from '../components/projects/ProjectCard';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const { data, loading } = useFetch(() => getMyBookmarks().then((r) => r.data.data));

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-ink">Bookmarked projects</h1>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
        </div>
      ) : data?.bookmarks?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.bookmarks.map((b) => b.project && <ProjectCard key={b._id} project={b.project} />)}
        </div>
      ) : (
        <EmptyState
          title="No bookmarks yet"
          description="Save projects you want to revisit later."
          action={<Link to="/explore" className="text-ember-600 hover:underline">Explore projects</Link>}
        />
      )}
    </div>
  );
}
