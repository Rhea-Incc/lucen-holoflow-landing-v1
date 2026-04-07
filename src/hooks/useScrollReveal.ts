import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  scrub?: boolean | number;
  children?: boolean; // animate direct children with stagger
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      scale = 1,
      opacity = 0,
      duration = 1,
      delay = 0,
      stagger = 0.12,
      ease = 'power3.out',
      start = 'top 85%',
      scrub = false,
      children = false,
    } = options;

    const targets = children ? el.children : el;

    gsap.set(targets, { y, x, scale, opacity, willChange: 'transform, opacity' });

    const tween = gsap.to(targets, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      stagger: children ? stagger : 0,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub || false,
        once: !scrub,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}
