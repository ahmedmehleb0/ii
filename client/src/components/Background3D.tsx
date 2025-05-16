import { useEffect, useRef } from "react";

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);
  const orbitingElementsRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    // Add animated gradient background effects with CSS
    const root = document.documentElement;
    let position = 0;
    
    const animateGradient = () => {
      // Slower animation for better performance
      position = (position + 0.3) % 360;
      root.style.setProperty('--gradient-position', `${position}deg`);
      requestAnimationFrame(animateGradient);
    };
    
    animateGradient();
    
    // Create animated stars - performance optimized
    const container = containerRef.current;
    if (!container) return;
    
    // Remove any existing stars first
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create new stars (reduced count for better performance)
    const starCount = 80; 
    const newStarsRef: HTMLDivElement[] = [];
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size (slightly smaller for better performance)
      const size = Math.random() * 2.5 + 0.8;
      
      // Random opacity
      const opacity = Math.random() * 0.6 + 0.2;
      
      // Random animation delay
      const delay = Math.random() * 8;
      
      // Apply styles
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = `${opacity}`;
      star.style.animationDelay = `${delay}s`;
      
      container.appendChild(star);
      newStarsRef.push(star);
    }
    
    starsRef.current = newStarsRef;
    
    // Create orbiting elements for enhanced 3D effect
    const orbitsContainer = document.createElement('div');
    orbitsContainer.className = 'absolute inset-0 overflow-hidden';
    container.appendChild(orbitsContainer);
    
    const orbitCount = 3;
    const newOrbitingElements: HTMLDivElement[] = [];
    
    for (let i = 0; i < orbitCount; i++) {
      const orbit = document.createElement('div');
      orbit.className = 'absolute rounded-full border border-blue-500/10';
      
      // Different size orbits
      const size = 100 + i * 40;
      
      // Center orbit with random offset
      const offsetX = Math.random() * 10 - 5;
      const offsetY = Math.random() * 10 - 5;
      
      // Apply styles
      orbit.style.width = `${size}%`;
      orbit.style.height = `${size}%`;
      orbit.style.left = `calc(50% - ${size/2}% + ${offsetX}%)`;
      orbit.style.top = `calc(50% - ${size/2}% + ${offsetY}%)`;
      orbit.style.animation = `orbit ${12 + i * 5}s linear infinite ${i * 2}s`;
      
      orbitsContainer.appendChild(orbit);
      newOrbitingElements.push(orbit);
      
      // Add a dot to orbit around
      const dot = document.createElement('div');
      dot.className = 'absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500';
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.top = '0';
      dot.style.left = '50%';
      dot.style.transform = 'translate(-50%, -50%)';
      dot.style.filter = 'blur(1px)';
      orbit.appendChild(dot);
    }
    
    orbitingElementsRef.current = newOrbitingElements;
    
    return () => {
      root.style.removeProperty('--gradient-position');
      
      // Clean up all elements
      starsRef.current.forEach(star => {
        if (star.parentNode === container) {
          container.removeChild(star);
        }
      });
      
      if (orbitsContainer.parentNode === container) {
        container.removeChild(orbitsContainer);
      }
    };
  }, []);
  
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-0 bg-background-gradient opacity-60"
      aria-hidden="true"
    >
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {/* Stars and orbiting elements will be created here dynamically */}
      </div>
      
      {/* Optimized gradient effects */}
      <div className="absolute inset-0 animate-pulse-slow">
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/15 via-transparent to-transparent blur-2xl transform translate-x-1/4 translate-y-1/4"></div>
      </div>
      <div className="absolute inset-0 animate-pulse-slow animation-delay-1000">
        <div className="absolute inset-0 bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-2xl transform -translate-x-1/4 -translate-y-1/4"></div>
      </div>
      <div className="absolute inset-0 animate-pulse-slow animation-delay-2000">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent blur-xl"></div>
      </div>
    </div>
  );
}
