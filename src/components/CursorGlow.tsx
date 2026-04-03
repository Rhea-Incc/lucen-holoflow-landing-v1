import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-50 w-[400px] h-[400px] rounded-full opacity-20 transition-transform duration-100 ease-out"
      style={{
        background: 'radial-gradient(circle, hsl(192 95% 60% / 0.15) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
