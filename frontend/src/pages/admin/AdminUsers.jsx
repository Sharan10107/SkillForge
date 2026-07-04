import { useFetch } from '../../hooks/useFetch';
import { listUsers, toggleBanUser } from '../../api/admin.api';
import UserTable from '../../components/admin/UserTable';
import Skeleton from '../../components/ui/Skeleton';

export default function AdminUsers() {
  const { data, loading, refetch } = useFetch(() => listUsers().then((r) => r.data.data));

  const handleToggleBan = async (id) => {
    await toggleBanUser(id);
    refetch();
  };

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-ink">Manage users</h1>
      {loading ? <Skeleton className="h-96" /> : <UserTable users={data?.users} onToggleBan={handleToggleBan} />}
    </div>
  );
}
