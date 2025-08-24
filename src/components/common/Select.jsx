import React, { useState, useMemo } from "react";

export const Select = ({ label, value, onChange, options, className = "" }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/25 focus:border-red-700 bg-white hover:border-red-400 transition-all duration-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
