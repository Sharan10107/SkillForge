import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axiosInstance';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await axiosInstance.post('/contact', values);
      toast.success('Message sent — we will get back to you soon');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send message');
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-display text-3xl text-ink">Get in touch</h1>
        <p className="mb-8 text-ink-muted">Questions, feedback, or partnership ideas — we read everything.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-muted">Message</span>
            <textarea rows={5} className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 outline-none focus:border-ember-500" {...register('message', { required: true })} />
          </label>
          <Button type="submit" loading={isSubmitting} className="w-full">Send message</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
