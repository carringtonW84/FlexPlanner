import React, { useState, useMemo } from "react";

export const NavigationBar = ({ items, activeItem, onItemClick }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-purple-200 sticky top-0 z-30">
      <div className="container mx-auto px-6">
        <ul className="flex space-x-2 overflow-x-auto py-2">
          {items.map((item) => (
            <li key={item.id} className="whitespace-nowrap">
              <button
                onClick={() => onItemClick(item.id)}
                className={`py-4 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
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
