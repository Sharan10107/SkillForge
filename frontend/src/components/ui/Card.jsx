import { motion } from 'framer-motion';

// Base surface used by ProjectCard, StatCard, and dashboard panels.
// The clipped corner + hover lift is the app's signature motif.
export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.25 }}
      className={`clip-corner surface-panel rounded-sm p-5 transition-shadow duration-200 ${hover ? 'hover:shadow-raised' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
