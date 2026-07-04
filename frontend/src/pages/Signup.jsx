import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint bg-grid px-4">
      <div className="clip-corner surface-panel w-full max-w-md rounded-sm p-8">
        <h1 className="mb-1 font-display text-2xl text-ink">Create your account</h1>
        <p className="mb-6 text-sm text-ink-muted">Start drafting a portfolio worth showing off.</p>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account? <Link to="/login" className="text-ember-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
