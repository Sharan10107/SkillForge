import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmail } from '../api/auth.api';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const token = params.get('token');
    if (!token) return setStatus('error');
    verifyEmail(token).then(() => setStatus('success')).catch(() => setStatus('error'));
  }, [params]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
      {status === 'verifying' && <p className="text-ink-muted">Verifying your email…</p>}
      {status === 'success' && (
        <>
          <h1 className="font-display text-2xl text-ink">Email verified 🎉</h1>
          <Link to="/dashboard" className="text-ember-600 hover:underline">Go to your dashboard</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className="font-display text-2xl text-ink">Verification link invalid or expired</h1>
          <Link to="/dashboard" className="text-ember-600 hover:underline">Go to your dashboard</Link>
        </>
      )}
    </div>
  );
}
