'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingWrapper from "@/components/loading/loadingWrapper";
const LoadingContext = createContext(null);

function LoadingProviderInner({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    handleStart();
    handleComplete();
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <LoadingWrapper isLoading={isLoading}>
        {children}
      </LoadingWrapper>
    </LoadingContext.Provider>
  );
}

export function LoadingProvider({ children }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadingProviderInner>{children}</LoadingProviderInner>
    </React.Suspense>
  );
}

export const useLoading = () => useContext(LoadingContext);