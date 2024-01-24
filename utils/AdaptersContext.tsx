// AdaptersContext.tsx

import React, { createContext, useContext, useMemo } from 'react';

const AdaptersContext = createContext<any[]>([]); // Adjust the type based on the actual type of adapters

export const useAdapters = () => {
  const adapters = useContext(AdaptersContext);
  if (!adapters) {
    throw new Error('useAdapters must be used within an AdaptersProvider');
  }
  return adapters;
};

interface AdaptersProviderProps {
  adapters: any[];
  children: React.ReactNode;
}

export const AdaptersProvider: React.FC<AdaptersProviderProps> = ({ adapters, children }) => {
  const memoizedAdapters = useMemo(() => adapters, [adapters]);

  return <AdaptersContext.Provider value={memoizedAdapters}>{children}</AdaptersContext.Provider>;
};
