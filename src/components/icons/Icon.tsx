import React, { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  paths?: Array<{
    d: string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    clipRule?: string;
    fill?: string;
  }>;
  viewBox?: string;
  size?: number | string;
  color?: string;
}

export function Icon({
  paths,
  viewBox = '0 0 24 24',
  size = 24,
  color = 'currentColor',
  className = '',
  ...rest
}: IconProps) {
  // Allow setting width and height through size prop or through individual props
  const width = rest.width || size;
  const height = rest.height || size;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={className}
      {...rest}
    >
      {paths?.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fillRule={path.fillRule || 'evenodd'}
          clipRule={path.clipRule || ''}
          fill={path.fill || color}
        />
      ))}
      {rest.children}
    </svg>
  );
} 