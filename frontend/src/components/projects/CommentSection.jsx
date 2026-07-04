import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getComments, addComment } from '../../api/comment.api';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function CommentSection({ projectId }) {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { data, loading, refetch } = useFetch(
    () => getComments(projectId).then((r) => r.data.data),
    [projectId]
  );
  const [posting, setPosting] = useState(false);

  const onSubmit = async ({ content }) => {
    if (!content?.trim()) return;
    setPosting(true);
    try {
      await addComment(projectId, { content });
      reset();
      refetch();
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 font-display text-lg text-ink">Discussion</h3>

      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex gap-3">
          <Avatar src={user.avatarUrl} name={user.name} size={36} />
          <div className="flex-1">
            <textarea
              rows={2}
              placeholder="Share feedback on this project…"
              className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-ember-500"
              {...register('content')}
            />
            <Button type="submit" size="sm" loading={posting} className="mt-2">Comment</Button>
          </div>
        </form>
      ) : (
        <p className="mb-6 text-sm text-ink-muted">Log in to join the discussion.</p>
      )}

      {loading && <p className="text-sm text-ink-muted">Loading comments…</p>}

      <div className="flex flex-col gap-4">
        {data?.comments?.length === 0 && <p className="text-sm text-ink-muted">No comments yet — be the first.</p>}
        {data?.comments?.map((c) => (
          <div key={c._id} className="flex gap-3">
            <Avatar src={c.author?.avatarUrl} name={c.author?.name} size={32} />
            <div className="surface-panel flex-1 rounded-sm p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-display text-sm text-ink">{c.author?.name}</span>
                <span className="text-xs text-ink-muted">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-ink-muted">{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
