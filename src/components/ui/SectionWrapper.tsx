import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-container" style={{ textAlign: 'center' }}>
        {children}
      </div>
    </section>
  );
}
