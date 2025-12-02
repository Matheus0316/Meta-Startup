import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
  className?: string;
}

const ScrollAnimationWrapper = ({ 
  children, 
  animation = 'fade-in-up',
  delay = 0,
  className = ''
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${animation} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
