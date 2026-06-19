import React, { createContext, useContext, useState, useEffect } from 'react';

interface MotionContextType {
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  setReducedMotion: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user pre-configures via browser or local preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }
  }, []);

  // Update HTML body class to allow standard CSS bypasses too
  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('no-motion');
    } else {
      document.body.classList.remove('no-motion');
    }
  }, [reducedMotion]);

  return (
    <MotionContext.Provider value={{ reducedMotion, setReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionSettings() {
  return useContext(MotionContext);
}
