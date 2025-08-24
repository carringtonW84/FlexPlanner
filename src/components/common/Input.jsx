import React, { useState, useMemo } from "react";

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/25 focus:border-red-700 transition-all duration-300 ${
          readOnly
            ? "bg-gray-50 cursor-not-allowed"
            : "bg-white hover:border-red-400"
        }`}
      />
    </div>
  );
};
