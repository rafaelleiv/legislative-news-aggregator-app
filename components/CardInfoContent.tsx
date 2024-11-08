import React from 'react';

interface CardInfoContentProps {
  heading: string;
  children: React.ReactNode;
}

const CardInfoContent: React.FC<CardInfoContentProps> = ({
  heading,
  children,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-gray-400 text-sm font-semibold mb-1">{heading}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
};

export default CardInfoContent;
