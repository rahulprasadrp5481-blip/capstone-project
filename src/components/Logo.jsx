export default function Logo({ className = "", textClass = "text-white" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}>
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-amber-300" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
        />
        <path fill="#0f766e" d="M12 5.5 8 9h1v3.5h6V9h1z" />
      </svg>
      <span className={`text-xl ${textClass}`}>
        Trail<span className="text-amber-300">Nest</span>
      </span>
    </span>
  );
}