import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../api/auth.api';
import { useToast } from '../../context/ToastContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const onSubmit = async ({ email }) => {
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  if (sent) {
    return <p className="text-sm text-ink-muted">If that email exists, a reset link is on its way. Check your inbox.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@university.edu"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required' })}
      />
      <Button type="submit" loading={isSubmitting} className="w-full">Send reset link</Button>
    </form>
  );
}
