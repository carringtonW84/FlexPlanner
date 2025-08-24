import React, { useState, useMemo } from "react";

export const Toggle = ({ label, checked, onChange, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-300 ${className}`}
    >
      <span className="text-base font-semibold text-gray-800">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/25 ${
          checked ? "bg-gradient-to-r from-red-800 to-red-700" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
