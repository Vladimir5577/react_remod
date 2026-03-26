import { forwardRef } from 'react';

const variants = {
  default: 'bg-accent text-black hover:bg-accent-hover active:scale-[0.98]',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-ink/5',
  outline: 'bg-transparent border border-border text-ink hover:bg-ink/5 hover:border-border-strong',
};

const sizes = {
  sm: 'px-4 py-2 text-body-sm rounded-lg',
  md: 'px-5 py-2.5 text-body-sm rounded-lg',
  lg: 'px-7 py-3.5 text-body rounded-pill',
};

const Button = forwardRef(function Button(
  { variant = 'default', size = 'md', className = '', children, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-colors duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export { Button };
