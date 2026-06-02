import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', style = {} }: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`} style={{ overflow: 'hidden', ...style }}>
      {children}
    </div>
  );
}


