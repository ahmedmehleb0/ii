import { useRef, useEffect } from "react";

type EasingFunction = (t: number) => number;

/**
 * Linear easing function
 * @param t - Current time (between 0 and 1)
 * @returns The interpolated value
 */
export const linear: EasingFunction = (t) => t;

/**
 * Ease out quad function
 * @param t - Current time (between 0 and 1)
 * @returns The interpolated value
 */
export const easeOutQuad: EasingFunction = (t) => t * (2 - t);

/**
 * Ease in out quad function
 * @param t - Current time (between 0 and 1)
 * @returns The interpolated value
 */
export const easeInOutQuad: EasingFunction = (t) => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

/**
 * Animates a value from start to end over a duration
 * @param callback - Function called on each frame with the current value
 * @param start - Starting value
 * @param end - Ending value
 * @param duration - Duration in milliseconds
 * @param easing - Easing function to use
 * @returns A function to stop the animation
 */
export function animateValue(
  callback: (value: number) => void,
  start: number,
  end: number,
  duration: number = 1000,
  easing: EasingFunction = easeOutQuad
): () => void {
  const startTime = Date.now();
  let animationFrame: number;
  
  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    callback(start + (end - start) * easing(progress));
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    }
  };
  
  animationFrame = requestAnimationFrame(animate);
  
  return () => cancelAnimationFrame(animationFrame);
}

/**
 * React hook for using animations on component mount
 * @param callback - Function to run each animation frame
 * @param duration - Duration of the animation in milliseconds
 * @param dependencies - Array of dependencies to watch for changes
 */
export function useAnimation(
  callback: (progress: number) => void, 
  duration: number = 1000,
  dependencies: any[] = []
) {
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  useEffect(() => {
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);
      
      callback(progress);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, dependencies);
}
