import { useAuthContext } from '../context/AuthContext';

// Re-exported for a cleaner import path in components: `useAuth()` instead
// of reaching into context/AuthContext directly.
export const useAuth = () => useAuthContext();
