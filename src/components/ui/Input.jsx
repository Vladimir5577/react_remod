import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className = '', error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`
        w-full px-4 py-3 rounded-lg border bg-bg-secondary text-body text-ink
        placeholder:text-ink-faint
        focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-red-400 focus:ring-red-400' : 'border-border'}
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export { Input };
