import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';

const categories = [
  'Web Development', 'Mobile App', 'Machine Learning', 'Data Science',
  'DevOps', 'Game Development', 'UI/UX Design', 'Blockchain', 'IoT', 'Other',
];

export default function ProjectForm({ defaultValues = {}, onSubmit, submitLabel = 'Publish project' }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues });

  const submit = async (values) => {
    await onSubmit({
      ...values,
      tags: values.tags ? values.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      techStack: values.techStack ? values.techStack.split(',').map((t) => t.trim()).filter(Boolean) : [],
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <Input label="Title" error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
      <Input label="Tagline" placeholder="One line that sells the project" {...register('tagline')} />

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-muted">Description</span>
        <textarea
          rows={6}
          className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-ink outline-none focus:border-ember-500"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <span className="mt-1 block text-xs text-danger">{errors.description.message}</span>}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-muted">Category</span>
        <select
          className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-ink outline-none focus:border-ember-500"
          {...register('category', { required: true })}
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <Input label="Tags (comma separated)" placeholder="react, ai, hackathon" {...register('tags')} />
      <Input label="Tech stack (comma separated)" placeholder="React, Node.js, MongoDB" {...register('techStack')} />
      <Input label="GitHub URL" placeholder="https://github.com/you/project" {...register('githubUrl')} />
      <Input label="Live demo URL" placeholder="https://your-project.vercel.app" {...register('liveUrl')} />

      <Button type="submit" loading={isSubmitting} className="mt-2 w-full">{submitLabel}</Button>
    </form>
  );
}
