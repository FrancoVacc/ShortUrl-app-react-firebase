import React, { forwardRef } from "react";

const FormInput = forwardRef(
  (
    { type, placeholder, onChange, onBlur, name, label, children, error },
    ref
  ) => {
    const errorLabelClass = error
      ? "text-red-700 dark:text-red-500"
      : "text-gray-900 dark:text-white";

    const errorInputClass = error
      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500  dark:bg-red-100 dark:border-red-400"
      : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 ";

    return (
      <div className="mb-6">
        <label
          htmlFor={name}
          className={`block mb-2 text-sm font-medium ${errorLabelClass} `}
        >
          {label}
        </label>
        <input
          className={`text-sm rounded-lg block w-full p-2.5 ${errorInputClass}`}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        {children}
      </div>
    );
  }
);

export default FormInput;
