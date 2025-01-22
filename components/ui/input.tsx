import React from 'react';

export const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black ${className}`}
  />
);
