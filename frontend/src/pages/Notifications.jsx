import { useFetch } from '../hooks/useFetch';
import { getNotifications, markAllAsRead, markAsRead } from '../api/notification.api';
import Navbar from '../components/layout/Navbar';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

export default function Notifications() {
  const { data, loading, refetch } = useFetch(() => getNotifications().then((r) => r.data.data));

  const handleRead = async (id) => {
    await markAsRead(id);
    refetch();
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-2xl text-ink">Notifications</h1>
          <Button size="sm" variant="secondary" onClick={() => markAllAsRead().then(refetch)}>Mark all as read</Button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : data?.notifications?.length ? (
          <div className="flex flex-col gap-3">
            {data.notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => !n.isRead && handleRead(n._id)}
                className={`clip-corner-sm surface-panel flex cursor-pointer items-center gap-3 rounded-sm p-4 ${!n.isRead ? 'border-ember-500/40' : ''}`}
              >
                <Avatar src={n.sender?.avatarUrl} name={n.sender?.name} size={36} />
                <div>
                  <p className="text-sm text-ink">{n.message}</p>
                  <p className="text-xs text-ink-muted">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="You're all caught up" description="New likes, comments, and bookmarks will show up here." />
        )}
      </div>
    </div>
  );
}
