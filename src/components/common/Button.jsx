import React, { useState, useMemo } from "react";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 transform hover:scale-105 active:scale-95 shadow-lg";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500 shadow-purple-500/25",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500 shadow-gray-500/25",
    outline:
      "border-2 border-purple-500 text-purple-700 bg-white hover:bg-purple-50 focus:ring-purple-500 shadow-purple-500/25",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-red-500/25",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled
          ? "opacity-50 cursor-not-allowed transform-none hover:scale-100"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
