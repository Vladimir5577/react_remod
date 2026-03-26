export default function Logo({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center font-black uppercase text-ink ${className}`}
      style={{ letterSpacing: '-0.025em', lineHeight: 1 }}
      aria-label="Remod"
    >
      REM
      <span
        className="relative inline-flex items-center justify-center mx-[0.03em] flex-shrink-0"
        style={{
          width: '0.78em',
          height: '0.82em',
          border: '0.09em solid currentColor',
          borderRadius: '0.13em',
        }}
        aria-hidden="true"
      >
        <span
          className="bg-accent block"
          style={{ width: '0.42em', height: '0.30em', borderRadius: '999px' }}
        />
      </span>
      D
    </span>
  );
}
