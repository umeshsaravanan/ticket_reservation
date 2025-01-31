import React from 'react';

const Loader = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50 h-screen w-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black"></div>
    </div>
  );
};

export default Loader;
