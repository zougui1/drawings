import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

export const ErrorBoundary: React.FC = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={() => <h1>an error occured</h1>}>
      {children}
    </ReactErrorBoundary>
  )
}
