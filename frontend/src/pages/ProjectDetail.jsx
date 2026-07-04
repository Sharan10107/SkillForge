import { useParams } from 'react-router-dom';
import { getProjectBySlug } from '../api/project.api';
import { useFetch } from '../hooks/useFetch';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import LikeBookmarkBar from '../components/projects/LikeBookmarkBar';
import CommentSection from '../components/projects/CommentSection';
import Skeleton from '../components/ui/Skeleton';
import { Link } from 'react-router-dom';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, loading } = useFetch(() => getProjectBySlug(slug).then((r) => r.data.data.project), [slug]);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {loading || !data ? (
          <Skeleton className="h-96" />
        ) : (
          <>
            <Badge tone="ember">{data.category}</Badge>
            <h1 className="mt-3 font-display text-3xl text-ink">{data.title}</h1>
            {data.tagline && <p className="mt-2 text-lg text-ink-muted">{data.tagline}</p>}

            <div className="mt-4 flex items-center gap-3">
              <Link to={`/u/${data.owner?.slug}`} className="flex items-center gap-2">
                <Avatar src={data.owner?.avatarUrl} name={data.owner?.name} size={32} />
                <span className="text-sm text-ink">{data.owner?.name}</span>
              </Link>
            </div>

            {data.coverImage?.url && (
              <img src={data.coverImage.url} alt={data.title} className="clip-corner mt-6 w-full rounded-sm object-cover" />
            )}

            <div className="mt-6"><LikeBookmarkBar project={data} /></div>

            <p className="mt-6 whitespace-pre-wrap leading-relaxed text-ink-muted">{data.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(data.techStack || []).map((t) => <Badge key={t} tone="steel">{t}</Badge>)}
            </div>

            <CommentSection projectId={data._id} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
