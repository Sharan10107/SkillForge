import { useFetch } from '../../hooks/useFetch';
import { listReports, resolveReport } from '../../api/admin.api';
import ReportsPanel from '../../components/admin/ReportsPanel';
import Skeleton from '../../components/ui/Skeleton';

export default function AdminReports() {
  const { data, loading, refetch } = useFetch(() => listReports().then((r) => r.data.data));

  const handleResolve = async (id, status) => {
    await resolveReport(id, status);
    refetch();
  };

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-ink">Reports</h1>
      {loading ? <Skeleton className="h-64" /> : <ReportsPanel reports={data?.reports} onResolve={handleResolve} />}
    </div>
  );
}
