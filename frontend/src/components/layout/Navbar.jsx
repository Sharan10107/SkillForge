import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import MobileNav from './MobileNav';

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

// Sticky top nav: transparent-to-solid on scroll would be a nice touch,
// kept simple here as a translucent glass bar that's always readable.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="clip-corner-sm flex h-8 w-8 items-center justify-center bg-ember-gradient text-white">SF</span>
          SkillForge
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-ember-600' : 'text-ink-muted hover:text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-ink-muted hover:bg-surface-raised hover:text-ink"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <>
              <button
                onClick={() => navigate('/notifications')}
                aria-label="Notifications"
                className="rounded-full p-2 text-ink-muted hover:bg-surface-raised hover:text-ink"
              >
                <FiBell size={18} />
              </button>
              <Dropdown trigger={<Avatar src={user.avatarUrl} name={user.name} size={36} />}>
                <Link to="/dashboard" className="block rounded-sm px-3 py-2 text-sm hover:bg-surface">Dashboard</Link>
                <Link to="/settings" className="block rounded-sm px-3 py-2 text-sm hover:bg-surface">Settings</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block rounded-sm px-3 py-2 text-sm hover:bg-surface">Admin panel</Link>
                )}
                <button onClick={() => { logout(); navigate('/'); }} className="block w-full rounded-sm px-3 py-2 text-left text-sm text-danger hover:bg-surface">
                  Log out
                </button>
              </Dropdown>
            </>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link to="/login" className="text-sm font-medium text-ink-muted hover:text-ink">Log in</Link>
              <Button size="sm" onClick={() => navigate('/signup')}>Get started</Button>
            </div>
          )}

          <button className="p-2 text-ink md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={links} user={user} />
    </header>
  );
}
