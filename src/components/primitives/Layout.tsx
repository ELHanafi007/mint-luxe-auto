import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Architectural Grid System
 * Refactored with forwardRef to support high-end motion tracking.
 */
export const Grid = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={clsx(styles.grid, className)}>
      {children}
    </div>
  )
);
Grid.displayName = 'Grid';

export const Section = forwardRef<HTMLElement, LayoutProps>(
  ({ children, className, id }, ref) => (
    <section ref={ref} id={id} className={clsx(styles.section, className)}>
      {children}
    </section>
  )
);
Section.displayName = 'Section';

export const Container = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={clsx(styles.container, className)}>
      {children}
    </div>
  )
);
Container.displayName = 'Container';
