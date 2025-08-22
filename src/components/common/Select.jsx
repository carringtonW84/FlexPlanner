import React, { useState, useMemo } from "react";

export const Select = ({ label, value, onChange, options, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-500/25 focus:border-purple-500 bg-white hover:border-purple-300 transition-all duration-300"
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
