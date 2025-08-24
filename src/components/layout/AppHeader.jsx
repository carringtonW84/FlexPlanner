import React, { useState, useMemo } from "react";

export const AppHeader = () => {
  return (
    <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white shadow-lg relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full transform -translate-y-16 rotate-12"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full transform translate-y-12 -rotate-12"></div>
      </div>
      <div className="container mx-auto px-6 py-5 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-red-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">DCL || Flex Planner</h1>
              <p className="text-red-100 text-sm font-medium">
                Gérez le planning de votre équipe en toute simplicité
              </p>
            </div>
          </div>
          <div className="bg-white text-red-800 rounded-lg px-4 py-2 shadow-md">
            <div className="text-sm font-bold">Jérémy Courbet</div>
            <div className="text-xs">Équipe Développement</div>
          </div>
        </div>
      </div>
    </div>
  );
};
