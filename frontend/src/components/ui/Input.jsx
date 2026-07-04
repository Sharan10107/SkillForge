import { forwardRef } from 'react';

// Forwarding ref so react-hook-form's register() works directly.
const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <label className="block">
    {label && <span className="mb-1.5 block text-sm font-medium text-ink-muted">{label}</span>}
    <input
      ref={ref}
      className={`w-full rounded-md border bg-surface px-3.5 py-2.5 text-ink placeholder:text-ink-muted/60 outline-none transition-colors duration-150 focus:border-ember-500 ${
        error ? 'border-danger' : 'border-border'
      } ${className}`}
      {...props}
    />
    {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
  </label>
));

Input.displayName = 'Input';
export default Input;
