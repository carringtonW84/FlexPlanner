import React, { useState, useMemo } from "react";

export const AppHeader = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl font-bold">📅</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              WorkFlow Manager
            </h1>
            <p className="text-purple-100 text-sm font-medium">
              Gérez votre planning et votre équipe en toute simplicité
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
