import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signup(values);
      toast.success('Account created — check your email to verify');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Full name"
        placeholder="Ada Lovelace"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@university.edu"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required' })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
      />
      <Button type="submit" loading={isSubmitting} className="mt-2 w-full">Create account</Button>
    </form>
  );
}
