import React, { useState, useMemo } from "react";

export const TreeView = ({
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-4 focus:ring-red-500/25 focus:border-red-700 hover:border-red-400 transition-all duration-300"
        >
          {value || "Sélectionner..."}
          <span
            className={`float-right transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
