const tones = {
  ember: 'bg-ember-500/10 text-ember-600 border-ember-500/30',
  steel: 'bg-steel-500/10 text-steel-500 border-steel-500/30',
  success: 'bg-success/10 text-success border-success/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  neutral: 'bg-surface-raised text-ink-muted border-border',
};

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
