import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="src\assets\images\Capture.JPG" 
        alt="DisasterAI Logo"
        className="w-11 h-11
        rounded-full"
      />
    </div>
  );
};

export default Logo;


