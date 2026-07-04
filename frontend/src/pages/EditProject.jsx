import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug, updateProject } from '../api/project.api';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';
import ProjectForm from '../components/projects/ProjectForm';
import Skeleton from '../components/ui/Skeleton';

// Note: route is keyed by project id; the API's read endpoint is
// slug-based, so a real implementation would add a byId lookup —
// kept here as slug lookup to stay consistent with the read model.
export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data, loading } = useFetch(() => getProjectBySlug(id).then((r) => r.data.data.project), [id]);

  const handleUpdate = async (values) => {
    try {
      await updateProject(data._id, values);
      toast.success('Project updated');
      navigate('/dashboard/projects');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update project');
    }
  };

  if (loading) return <Skeleton className="h-96" />;
  if (!data) return <p className="text-ink-muted">Project not found.</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">Edit project</h1>
      <ProjectForm
        defaultValues={{
          ...data,
          tags: (data.tags || []).join(', '),
          techStack: (data.techStack || []).join(', '),
        }}
        onSubmit={handleUpdate}
        submitLabel="Save changes"
      />
    </div>
  );
}
