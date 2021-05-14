import React from 'react';

export const DisplayRequiredData: React.FC<DisplayRequiredDataProps> = ({ render: Render, fallback, data }) => {
  if(data) {
    return (
      <Render />
    );
  }

  return (
    <p style={{ color: '#a11' }}>
      {fallback}
    </p>
  );
}

export interface DisplayRequiredDataProps {
  data: any;
  fallback: React.ReactChild;
  render: React.FC;
}
