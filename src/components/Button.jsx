import React from "react";

const Button = ({ text, type, color = "purple", onClick }) => {
  return (
    <button
      type={type}
      className={`md:text-lg text-xs focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-base rounded-lg text-sm  px-2 py-1 md:px-5 md:py-2.5 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-900`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
