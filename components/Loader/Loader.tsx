import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-t-4 border-accent-foreground border-gray-200 rounded-full animate-spin-custom"></div>
    </div>
  );
};

export default Loader;
