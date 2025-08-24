import React, { useState, useMemo } from "react";

export const Card = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-red-800 pb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
