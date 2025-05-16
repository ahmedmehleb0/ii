import * as THREE from "three";

/**
 * Creates a gradient-colored point material for particle effects
 * @param startColor - The start color of the gradient
 * @param endColor - The end color of the gradient
 * @param size - The size of each particle
 * @returns A THREE.PointsMaterial with gradient properties
 */
export function createGradientPointMaterial(
  startColor: number = 0x6366F1,
  endColor: number = 0xEC4899,
  size: number = 0.02
): THREE.PointsMaterial {
  // Create a custom shader material for gradient particles
  return new THREE.PointsMaterial({
    size,
    color: startColor,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });
}

/**
 * Creates a particle system with random distribution
 * @param count - Number of particles to create
 * @param spread - How far particles can spread from center
 * @returns A THREE.Points object with particles
 */
export function createParticleSystem(
  count: number = 1000,
  spread: number = 10,
  material?: THREE.PointsMaterial
): THREE.Points {
  const particlesGeometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(count * 3);
  
  for(let i = 0; i < count * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * spread;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = material || createGradientPointMaterial();
  
  return new THREE.Points(particlesGeometry, particlesMaterial);
}

/**
 * Creates a wireframe cube with custom materials for each face
 * @param size - Size of the cube
 * @param colors - Array of 6 colors for each face
 * @returns A THREE.Mesh representing the cube
 */
export function createWireframeCube(
  size: number = 1,
  colors: number[] = [0x6366F1, 0x6366F1, 0xEC4899, 0xEC4899, 0x9333EA, 0x9333EA]
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(size, size, size);
  
  const materials = colors.map(color => 
    new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    })
  );
  
  return new THREE.Mesh(geometry, materials);
}
