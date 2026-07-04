import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint bg-grid px-4">
      <div className="clip-corner surface-panel w-full max-w-md rounded-sm p-8">
        <h1 className="mb-1 font-display text-2xl text-ink">Reset your password</h1>
        <p className="mb-6 text-sm text-ink-muted">We'll email you a link to get back in.</p>
        <ForgotPasswordForm />
        <p className="mt-6 text-center text-sm text-ink-muted">
          <Link to="/login" className="text-ember-600 hover:underline">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
