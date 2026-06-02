import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonCTAProps {
  href?: string; // if provided, renders as <a>
  onClick?: () => void; // if provided, renders as <button>
  children: ReactNode;
  primary?: boolean; // true => solid gradient button, false => outline
  target?: string;
}

export default function ButtonCTA({ href, onClick, children, primary = true, target }: ButtonCTAProps) {
  const baseClass =
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

  const solidClass =
    'bg-gradient-to-r from-primary to-accent-cyan text-white shadow-md hover:shadow-lg hover:translate-y-[-2px]';

  const outlineClass =
    'bg-transparent border border-white/30 text-white hover:border-primary hover:text-primary';

  const className = `${baseClass} ${primary ? solidClass : outlineClass}`;

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick} target={target}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
