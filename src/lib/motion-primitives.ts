/**
 * MINT.LUXE Motion Ecosystem
 * Refined for "Subliminal" feedback.
 * We prioritize duration over distance to create a "whisper" entrance.
 */

export const MINT_EASE: [number, number, number, number] = [0.19, 1, 0.22, 1]; // Editorial Ease

export const revealSubtle = {
  hidden: { 
    opacity: 0, 
    y: 15, // Reduced distance for restraint
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4, // Longer duration for luxury
      delay: custom * 0.1,
      ease: MINT_EASE,
    },
  }),
};

export const hoverUnderstated = {
  initial: { 
    scale: 1,
    filter: 'brightness(1)',
  },
  hover: { 
    scale: 1.01, // Minimalist lift
    filter: 'brightness(1.05)',
    transition: { 
      duration: 0.8, 
      ease: MINT_EASE 
    },
  },
};

export const pageEntrance = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 2, ease: MINT_EASE } 
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.8, ease: MINT_EASE } 
  }
};
