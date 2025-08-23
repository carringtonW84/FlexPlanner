// src/components/layout/AppHeader.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const AppHeader = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
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

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-semibold text-lg">
                  👋 {user.firstName} {user.lastName}
                </div>
                <div className="text-purple-100 text-sm">
                  {user.team ? `📋 ${user.team.name}` : "👤 Aucune équipe"}
                </div>
                <div className="text-purple-200 text-xs">
                  ⚡ Vélocité: {user.velocity} pts
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
