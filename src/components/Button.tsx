import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    className
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a 
        href={href} 
        className={classes} 
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) e.preventDefault();
          if (props.onClick) props.onClick(e as any);
        }}
      >
        {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
        <span className="btn-label">{children}</span>
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
      <span className="btn-label">{children}</span>
    </button>
  );
};
