import { useFetch } from '../../hooks/useFetch';
import { listProjectsForModeration, toggleFeatureProject, adminDeleteProject } from '../../api/admin.api';
import ProjectModerationTable from '../../components/admin/ProjectModerationTable';
import Skeleton from '../../components/ui/Skeleton';

export default function AdminProjects() {
  const { data, loading, refetch } = useFetch(() => listProjectsForModeration().then((r) => r.data.data));

  const handleFeature = async (id) => { await toggleFeatureProject(id); refetch(); };
  const handleDelete = async (id) => {
    if (!confirm('Remove this project? This cannot be undone.')) return;
    await adminDeleteProject(id);
    refetch();
  };

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-ink">Moderate projects</h1>
      {loading ? <Skeleton className="h-96" /> : (
        <ProjectModerationTable projects={data?.projects} onFeature={handleFeature} onDelete={handleDelete} />
      )}
    </div>
  );
}
