import React from 'react';


const Button = ({
  label,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyle = 'px-4 py-2 rounded-lg';

  const variantStyles = {
    primary: 'bg-primary-indigo text-white hover:bg-primary-indigo-hover',
    secondary: 'bg-white text-primary-indigo border border-primary-indigo hover:bg-primary-indigo-hover hover:text-white',
    danger: 'bg-wite text-red-500 border border-red-600 hover:bg-red-600 hover:text-white',
    default: 'hover:bg-light-gray',
  };

  const buttonClasses = `${baseStyle} ${variantStyles[variant]} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {label}
    </button>
  );
};

export default Button;