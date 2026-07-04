import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

export default function MobileNav({ open, onClose, links, user }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-72 bg-surface p-6"
          >
            <button onClick={onClose} className="mb-8 text-ink" aria-label="Close menu"><FiX size={22} /></button>
            <div className="flex flex-col gap-5">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={onClose} className="font-display text-lg text-ink">
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4">
                {user ? (
                  <Link to="/dashboard" onClick={onClose} className="font-display text-lg text-ember-600">Dashboard</Link>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={onClose} className="font-display text-lg text-ink">Log in</Link>
                    <Link to="/signup" onClick={onClose} className="font-display text-lg text-ember-600">Get started</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
