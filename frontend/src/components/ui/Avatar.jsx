export default function Avatar({ src, name = '', size = 40, className = '' }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover border border-border ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-full bg-ember-gradient font-display text-white ${className}`}
    >
      <span style={{ fontSize: size * 0.4 }}>{initials || '?'}</span>
    </div>
  );
}
