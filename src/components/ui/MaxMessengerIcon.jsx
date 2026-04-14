/** Логотип-стиль мессенджера MAX (контур «M»). */
export function MaxMessengerIcon({ className = '', size }) {
  const dim = size != null ? { width: size, height: size } : {};
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...dim}
    >
      <path
        d="M7 17V7l5 7.2L17 7v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
