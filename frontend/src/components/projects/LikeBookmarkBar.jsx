import { useState } from 'react';
import { FiHeart, FiBookmark, FiGithub, FiExternalLink } from 'react-icons/fi';
import { toggleLike } from '../../api/project.api';
import { toggleBookmark } from '../../api/bookmark.api';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import Button from '../ui/Button';

export default function LikeBookmarkBar({ project }) {
  const { user } = useAuth();
  const toast = useToast();
  const [liked, setLiked] = useState(project.likes?.includes(user?._id));
  const [likesCount, setLikesCount] = useState(project.likesCount || 0);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = async () => {
    if (!user) return toast.info('Log in to like projects');
    const { data } = await toggleLike(project._id);
    setLiked(data.data.liked);
    setLikesCount(data.data.likesCount);
  };

  const handleBookmark = async () => {
    if (!user) return toast.info('Log in to bookmark projects');
    const { data } = await toggleBookmark(project._id);
    setBookmarked(data.data.bookmarked);
    toast.success(data.message);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant={liked ? 'primary' : 'secondary'} size="sm" onClick={handleLike}>
        <FiHeart className={liked ? 'fill-white' : ''} /> {likesCount}
      </Button>
      <Button variant={bookmarked ? 'primary' : 'secondary'} size="sm" onClick={handleBookmark}>
        <FiBookmark className={bookmarked ? 'fill-white' : ''} /> {bookmarked ? 'Saved' : 'Save'}
      </Button>
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          <Button variant="secondary" size="sm"><FiGithub /> Code</Button>
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          <Button variant="secondary" size="sm"><FiExternalLink /> Live demo</Button>
        </a>
      )}
    </div>
  );
}
