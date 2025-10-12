import React from 'react';
import type { ButtonProps } from './props.interface';

const baseStyles =
  'inline-flex items-center justify-center rounded-2xl font-medium transition-shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const sizes = {
  sm: 'px-3 py-2 text-sm md:px-4 md:py-2.5 md:text-base',
  md: 'px-4 py-2.5 text-base md:px-5 md:py-3 md:text-lg',
  lg: 'px-5 py-3 text-lg md:px-6 md:py-3.5 md:text-xl',
};

const variants = {
  primary:
    'bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500',
  secondary:
    'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
  ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-200',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
  iconLeft,
  iconRight,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      }  ${className}`}
      {...rest}
    >
      {iconLeft && (
        <span className="-ml-1 mr-2 flex items-center">{iconLeft}</span>
      )}

      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-75"
          />
        </svg>
      ) : (
        <span className="flex items-center gap-2">
          <span>{children}</span>
        </span>
      )}

      {iconRight && (
        <span className="-mr-1 ml-2 flex items-center">{iconRight}</span>
      )}
    </button>
  );
};

export default Button;
