import React from 'react';

interface LogoIconProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
}

export function LogoIcon({ 
  className = '', 
  color = 'currentColor',
  width = 14, 
  height = 14 
}: LogoIconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 14 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M6.72771 0C9.89905 0 12.4274 2.16405 13.0328 5.35171H10.2062C9.67306 3.76605 8.37005 2.77416 6.72771 2.77416C4.52331 2.77416 2.85625 4.60634 2.85625 7.02297C2.85625 9.4396 4.52331 11.2401 6.72771 11.2401C8.44142 11.2401 9.76261 10.1728 10.2319 8.47104H13.0732C12.5109 11.6403 10.1829 13.8074 7.1685 14H6.27737C2.67621 13.7731 0 10.8333 0 7.02297C0 3.02347 2.90173 0 6.72771 0Z" 
        fill={color}
      />
    </svg>
  );
} 