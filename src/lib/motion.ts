export const LUXURY_EASE = [0.22, 1, 0.36, 1];

export const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 1.2,
      ease: LUXURY_EASE,
    },
  }),
};

export const hoverLift = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -8, 
    scale: 1.02, 
    transition: { duration: 0.6, ease: LUXURY_EASE } 
  },
};
