import React, { useState, useMemo } from "react";

export const Card = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-gradient-to-r from-purple-500 to-pink-500 pb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
