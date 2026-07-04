import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blueprint bg-grid px-4 text-center">
      <span className="font-display text-7xl font-bold text-ember-500">404</span>
      <h1 className="font-display text-2xl text-ink">This page hasn't been forged yet</h1>
      <p className="max-w-sm text-sm text-ink-muted">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/"><Button>Back to home</Button></Link>
    </div>
  );
}
