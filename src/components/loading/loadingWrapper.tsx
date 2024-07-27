'use client';

import React from 'react';

const LoadingWrapper = ({ children, isLoading }) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      <div className={isLoading ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
};

export default LoadingWrapper;