// "use client";
import React from "react";

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
          error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-500"
        } dark:bg-gray-800 dark:border-gray-700 dark:text-white ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
