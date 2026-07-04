import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../api/auth.api';
import { useToast } from '../context/ToastContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async ({ password }) => {
    try {
      await resetPassword(token, password);
      toast.success('Password reset — please log in');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset link invalid or expired');
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center text-ink-muted">
        Missing or invalid reset link. <Link to="/forgot-password" className="ml-1 text-ember-600 hover:underline">Request a new one</Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint bg-grid px-4">
      <div className="clip-corner surface-panel w-full max-w-md rounded-sm p-8">
        <h1 className="mb-6 font-display text-2xl text-ink">Set a new password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="New password"
            type="password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
          />
          <Button type="submit" loading={isSubmitting} className="w-full">Reset password</Button>
        </form>
      </div>
    </div>
  );
}
