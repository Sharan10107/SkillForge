import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2">
          <span className="font-display text-lg font-bold text-ink">SkillForge</span>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            Where students draft their portfolio and forge it into something recruiters remember.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm text-ink">Platform</h4>
          <div className="flex flex-col gap-2 text-sm text-ink-muted">
            <Link to="/explore" className="hover:text-ink">Explore projects</Link>
            <Link to="/signup" className="hover:text-ink">Create portfolio</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm text-ink">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-ink-muted">
            <Link to="/contact" className="hover:text-ink">Contact</Link>
            <Link to="/faq" className="hover:text-ink">FAQ</Link>
            <Link to="/privacy" className="hover:text-ink">Privacy policy</Link>
            <Link to="/terms" className="hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-ink-muted sm:px-6 lg:px-8">
        © {new Date().getFullYear()} SkillForge. Built for students who ship.
      </div>
    </footer>
  );
}
