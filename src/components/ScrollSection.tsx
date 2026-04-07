import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  animateChildren?: boolean;
  scale?: number;
}

export default function ScrollSection({
  children,
  className = '',
  y = 80,
  delay = 0,
  stagger = 0.15,
  animateChildren = false,
  scale,
}: ScrollSectionProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    y,
    delay,
    stagger,
    children: animateChildren,
    scale: scale ?? 1,
    duration: 1.2,
    ease: 'power3.out',
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
