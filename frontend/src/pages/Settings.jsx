import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { updateProfile, uploadAvatar, uploadResume } from '../api/user.api';
import { useToast } from '../context/ToastContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import SkillsEditor from '../components/profile/SkillsEditor';
import SocialLinks from '../components/profile/SocialLinks';
import { useState } from 'react';

export default function Settings() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: user });
  const [skills, setSkills] = useState(user?.skills || []);

  const onSubmit = async (values) => {
    try {
      const { data } = await updateProfile({ ...values, skills });
      setUser(data.data.user);
      toast.success('Settings saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save settings');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { data } = await uploadAvatar(file);
    setUser({ ...user, avatarUrl: data.data.avatarUrl });
    toast.success('Avatar updated');
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadResume(file);
    toast.success('Resume uploaded');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">Settings</h1>

      <div className="mb-8 flex items-center gap-4">
        <Avatar src={user?.avatarUrl} name={user?.name} size={64} />
        <label className="cursor-pointer text-sm text-ember-600 hover:underline">
          Change avatar
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Full name" {...register('name')} />
        <Input label="Headline" placeholder="Final-year CS student building AI tools" {...register('headline')} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">Bio</span>
          <textarea rows={4} className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 outline-none focus:border-ember-500" {...register('bio')} />
        </label>
        <Input label="Location" {...register('location')} />

        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">Skills</span>
          <SkillsEditor skills={skills} onChange={setSkills} />
        </div>

        <SocialLinks register={register} />

        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink-muted">Resume</span>
          <input type="file" accept=".pdf" onChange={handleResumeChange} className="text-sm text-ink-muted" />
        </div>

        <Button type="submit" loading={isSubmitting} className="mt-2 w-full">Save changes</Button>
      </form>
    </div>
  );
}
