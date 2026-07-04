import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/project.api';
import { useToast } from '../context/ToastContext';
import ProjectForm from '../components/projects/ProjectForm';

export default function CreateProject() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleCreate = async (values) => {
    try {
      const { data } = await createProject(values);
      toast.success('Project published');
      navigate(`/projects/${data.data.project.slug}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create project');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">Add a new project</h1>
      <ProjectForm onSubmit={handleCreate} submitLabel="Publish project" />
    </div>
  );
}
