
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-weather-blue"></div>
      <p className="text-weather-gray-dark text-lg">天気情報を読み込み中...</p>
    </div>
  );
};

export default LoadingSpinner;
