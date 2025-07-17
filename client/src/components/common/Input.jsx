const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`${className} w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70`}
      {...props}
    />
  );
};

export default Input;