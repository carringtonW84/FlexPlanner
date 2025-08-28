import React, { useState, useMemo } from "react";

export const AppHeader = ({ user, onAccountClick, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAccountClick = () => {
    setShowUserMenu(false);
    onAccountClick();
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      onLogout();
    }
  };

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
          
          {/* Menu utilisateur */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="bg-white text-red-800 rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 flex items-center space-x-2"
            >
              <div>
                <div className="text-sm font-bold">{user?.name || "undefined"}</div>
                <div className="text-xs">{user?.team?.name || "undefined"}</div>
              </div>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${showUserMenu ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Menu déroulant */}
            {showUserMenu && (
              <>
                {/* Overlay pour fermer le menu */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                ></div>
                
                {/* Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="py-2">
                    {/*<div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || "Jérémy Courbet"}</p>
                      <p className="text-xs text-gray-600">{user?.email || "jeremy.courbet@example.com"}</p>
                    </div>*/}
                    
                    <button
                      onClick={handleAccountClick}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Mon Compte
                    </button>
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                      </button>
                    </div> 
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};