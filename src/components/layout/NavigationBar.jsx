import React, { useState, useMemo } from "react";

export const NavigationBar = ({ items, activeItem, onItemClick }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-6">
        <ul className="flex space-x-2 overflow-x-auto py-3">
          {items.map((item) => (
            <li key={item.id} className="whitespace-nowrap">
              <button
                onClick={() => onItemClick(item.id)}
                className={`py-3 px-5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-red-800 to-red-700 text-white shadow-lg shadow-red-500/25"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-800 border border-transparent hover:border-red-200"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
