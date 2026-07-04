import { NavLink, Outlet } from 'react-router-dom';
import { FiGrid, FiFolder, FiBookmark, FiSettings, FiUser } from 'react-icons/fi';
import Navbar from './Navbar';

const items = [
  { to: '/dashboard', label: 'Overview', icon: FiGrid, end: true },
  { to: '/dashboard/projects', label: 'My projects', icon: FiFolder },
  { to: '/dashboard/bookmarks', label: 'Bookmarks', icon: FiBookmark },
  { to: '/dashboard/profile', label: 'Profile', icon: FiUser },
  { to: '/settings', label: 'Settings', icon: FiSettings },
];

// Animated sidebar + content shell shared by every authenticated
// dashboard route.
export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 flex flex-col gap-1">
            {items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-ember-500/10 text-ember-600' : 'text-ink-muted hover:bg-surface-raised hover:text-ink'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
