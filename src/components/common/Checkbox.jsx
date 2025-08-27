import React from "react";

export const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  className = "",
  disabled = false 
}) => {
  return (
    <div className={`flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mr-3"
      />
      <label className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
        {label}
      </label>
    </div>
  );
};