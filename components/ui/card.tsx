import React from 'react';

export const Card = ({ className = "", children, ...props }) => (
  <div
    {...props}
    className={`p-4 border border-black bg-white text-black rounded-lg ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-2">{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-2 font-bold">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg text-black">{children}</h2>
);

