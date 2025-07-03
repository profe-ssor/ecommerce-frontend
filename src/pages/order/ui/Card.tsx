import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false
}) => {
  return (
    <div
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-2xl ${
        hover ? 'hover:bg-white/10 hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};