import React, { useState, useMemo } from "react";

export const Toggle = ({ label, checked, onChange, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300 ${className}`}
    >
      <span className="text-base font-semibold text-gray-800">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/25 ${
          checked
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
