import { FiMapPin, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

export default function ProfileHeader({ user }) {
  return (
    <div className="clip-corner surface-panel overflow-hidden rounded-sm">
      <div
        className="h-40 bg-ember-gradient bg-blueprint bg-grid sm:h-56"
        style={user.bannerUrl ? { backgroundImage: `url(${user.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      />
      <div className="px-6 pb-6">
        <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Avatar src={user.avatarUrl} name={user.name} size={96} className="border-4 border-surface" />
        </div>
        <h1 className="mt-4 font-display text-2xl text-ink">{user.name}</h1>
        {user.headline && <p className="text-ink-muted">{user.headline}</p>}
        {user.location && (
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted"><FiMapPin size={14} /> {user.location}</p>
        )}
        {user.bio && <p className="mt-3 max-w-2xl text-sm text-ink-muted">{user.bio}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          {(user.skills || []).map((s) => <Badge key={s} tone="steel">{s}</Badge>)}
        </div>

        <div className="mt-4 flex items-center gap-4 text-ink-muted">
          {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" rel="noreferrer"><FiGithub size={20} className="hover:text-ink" /></a>}
          {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer"><FiLinkedin size={20} className="hover:text-ink" /></a>}
          {user.socialLinks?.portfolio && <a href={user.socialLinks.portfolio} target="_blank" rel="noreferrer"><FiGlobe size={20} className="hover:text-ink" /></a>}
        </div>
      </div>
    </div>
  );
}
