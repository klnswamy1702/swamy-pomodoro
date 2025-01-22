import React from 'react';

export const Button = ({ className = "", children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-800 ${className}`}
  >
    {children}
  </button>
);

