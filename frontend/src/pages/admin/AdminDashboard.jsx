import { useFetch } from '../../hooks/useFetch';
import { getAnalytics } from '../../api/admin.api';
import { FiUsers, FiFolder, FiMessageSquare } from 'react-icons/fi';
import StatCard from '../../components/shared/StatCard';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import Skeleton from '../../components/ui/Skeleton';

export default function AdminDashboard() {
  const { data, loading } = useFetch(() => getAnalytics().then((r) => r.data.data));

  if (loading || !data) return <Skeleton className="h-96" />;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl text-ink">Admin overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total users" value={data.userCount} icon={FiUsers} accent />
        <StatCard label="Total projects" value={data.projectCount} icon={FiFolder} />
        <StatCard label="Total comments" value={data.commentCount} icon={FiMessageSquare} />
      </div>
      <AnalyticsCharts topCategories={data.topCategories} signupsByMonth={data.signupsByMonth} />
    </div>
  );
}
