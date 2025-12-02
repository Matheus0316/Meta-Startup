import { useEffect } from 'react';

const StarfieldBackground = () => {
  useEffect(() => {
    const container = document.getElementById('starfield-container');
    if (!container) return;

    // Generate random number between min and max
    const genRandomNumber = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Generate a star element
    const genStar = () => {
      const star = document.createElement('div');
      star.classList.add('star');

      // Random position
      const x = genRandomNumber(0, window.innerWidth);
      const y = genRandomNumber(0, window.innerHeight);

      // Random properties
      const size = genRandomNumber(1, 3);
      const duration = Math.ceil(genRandomNumber(1, 5));
      const delay = Math.ceil(genRandomNumber(0, 5));

      star.style.left = `${Math.floor(x)}px`;
      star.style.top = `${Math.floor(y)}px`;
      star.style.setProperty('--star-size', `${size}px`);
      star.style.setProperty('--twinkle-duration', `${duration}s`);
      star.style.setProperty('--twinkle-delay', `${delay}s`);

      return star;
    };

    // Create stars
    const numStars = 400;
    const stars: HTMLElement[] = [];
    
    for (let i = 0; i < numStars; i++) {
      const star = genStar();
      stars.push(star);
      container.appendChild(star);
    }

    // Recreate stars on resize
    const handleResize = () => {
      stars.forEach(star => star.remove());
      stars.length = 0;
      
      for (let i = 0; i < numStars; i++) {
        const star = genStar();
        stars.push(star);
        container.appendChild(star);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      stars.forEach(star => star.remove());
    };
  }, []);

  return (
    <div
      id="starfield-container"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      }}
    />
  );
};

export default StarfieldBackground;
