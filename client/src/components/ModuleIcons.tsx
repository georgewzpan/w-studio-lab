/**
 * W Studio Lab — Module SVG Icons
 * 技术感线条风格图标，用于六模块能力矩阵
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function WeatherIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 4v2M16 22v2M6 14H4M28 14h-2M8.93 7.93l-1.41-1.41M24.48 23.48l-1.41-1.41M8.93 20.07l-1.41 1.41M24.48 8.52l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 24c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 27h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EnergyIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="24" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14V10a2 2 0 012-2h12a2 2 0 012 2v4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8L16 4l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 24v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 19h2l2-3 2 6 2-3h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EnvIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.17 9.17l2.83 2.83M19.17 19.17l2.83 2.83M9.17 22.83l2.83-2.83M19.17 12.83l2.83-2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CityIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4l-8 6v16h16V10L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 26V18h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 26h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 26V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 26V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WorksIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 11h24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 16l3 3-3 3M15 22h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="8.5" r="1" fill="currentColor" />
      <circle cx="11" cy="8.5" r="1" fill="currentColor" />
      <circle cx="14" cy="8.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function NotesIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4h12l6 6v18H8V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 14h8M12 18h8M12 22h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function getModuleIcon(id: string, className?: string, size?: number) {
  switch (id) {
    case "weather": return <WeatherIcon className={className} size={size} />;
    case "energy": return <EnergyIcon className={className} size={size} />;
    case "env": return <EnvIcon className={className} size={size} />;
    case "city": return <CityIcon className={className} size={size} />;
    case "works": return <WorksIcon className={className} size={size} />;
    case "notes": return <NotesIcon className={className} size={size} />;
    default: return null;
  }
}
