import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint bg-grid px-4">
      <div className="clip-corner surface-panel w-full max-w-md rounded-sm p-8">
        <h1 className="mb-1 font-display text-2xl text-ink">Welcome back</h1>
        <p className="mb-6 text-sm text-ink-muted">Log in to keep forging your portfolio.</p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-ink-muted">
          Forgot your password? <Link to="/forgot-password" className="text-ember-600 hover:underline">Reset it</Link>
        </p>
        <p className="mt-2 text-center text-sm text-ink-muted">
          New here? <Link to="/signup" className="text-ember-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
