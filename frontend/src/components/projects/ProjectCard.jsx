import { Link } from 'react-router-dom';
import { FiHeart, FiMessageSquare, FiEye } from 'react-icons/fi';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';

export default function ProjectCard({ project }) {
  return (
    <Card className="flex flex-col gap-3 p-0 overflow-hidden">
      <Link to={`/projects/${project.slug}`}>
        <div className="aspect-video w-full bg-surface-raised bg-blueprint bg-grid">
          {project.coverImage?.url && (
            <img src={project.coverImage.url} alt={project.title} className="h-full w-full object-cover" />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4 pt-1">
        <Badge tone="ember">{project.category}</Badge>
        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-display text-lg text-ink hover:text-ember-600">{project.title}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-ink-muted">{project.tagline || project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {(project.techStack || []).slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-surface-raised px-2 py-0.5 font-mono text-xs text-ink-muted">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <Link to={`/u/${project.owner?.slug}`} className="flex items-center gap-2">
            <Avatar src={project.owner?.avatarUrl} name={project.owner?.name} size={24} />
            <span className="text-xs text-ink-muted">{project.owner?.name}</span>
          </Link>
          <div className="flex items-center gap-3 text-ink-muted">
            <span className="flex items-center gap-1 text-xs"><FiHeart size={14} /> {project.likesCount || 0}</span>
            <span className="flex items-center gap-1 text-xs"><FiMessageSquare size={14} /> {project.commentsCount || 0}</span>
            <span className="flex items-center gap-1 text-xs"><FiEye size={14} /> {project.viewsCount || 0}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
