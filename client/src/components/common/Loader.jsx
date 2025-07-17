const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner animation */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
      </div>
      
      {/* Loading text with fade animation */}
      <p className="text-indigo-600 font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;