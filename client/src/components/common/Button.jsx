const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`${className} w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-200`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;