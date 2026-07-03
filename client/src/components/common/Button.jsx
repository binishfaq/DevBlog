const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition shadow-lg",

    outline:
      "border border-slate-300 hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-full font-medium transition",
  };

  return (
    <button
      className={`${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;