import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-ember-gradient text-white shadow-glow hover:brightness-105',
  secondary: 'bg-surface-raised text-ink border border-border hover:border-ember-500',
  ghost: 'bg-transparent text-ink-muted hover:text-ink',
  danger: 'bg-danger text-white hover:brightness-105',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

// Primary interactive primitive for the whole app. Carries the
// signature clipped-corner shape so every call-to-action reads as
// part of one visual system.
export default function Button({
  children, variant = 'primary', size = 'md', className = '', loading = false, ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      disabled={loading || props.disabled}
      className={`clip-corner-sm font-display font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
}
