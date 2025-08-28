// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // S'assurer que le token est défini dans apiService avant de faire l'appel
          apiService.setToken(token);
          const userData = await apiService.getCurrentUser();
          
          console.log("Données utilisateur chargées:", userData); // Debug
          
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to load user:", error);
          localStorage.removeItem("authToken");
          // Réinitialiser les états en cas d'erreur
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiService.login(email, password);
      
      console.log("Réponse de connexion:", response); // Debug
      
      // Après la connexion, récupérer les données utilisateur
      if (response && response.token) {
        // Le token est déjà défini dans apiService.login()
        
        // Maintenant récupérer les données utilisateur complètes
        const userData = await apiService.getCurrentUser();
        console.log("Données utilisateur après connexion:", userData); // Debug
        
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          
          // Sauvegarder les données utilisateur
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          throw new Error("Impossible de récupérer les données utilisateur");
        }
      } else {
        throw new Error("Token manquant dans la réponse de connexion");
      }
      
      return response;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setUser(null);
      setIsAuthenticated(false);
      // Nettoyer le token en cas d'erreur
      apiService.removeToken();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.removeToken();
    localStorage.removeItem("userData"); // Nettoyer aussi les données utilisateur
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = await apiService.updateCurrentUser(userData);
      setUser(updatedUser);
      
      // Mettre à jour aussi les données en localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error("Erreur lors de la mise à jour utilisateur:", error);
      throw error;
    }
  };

  // Fonction utilitaire pour récupérer les données depuis localStorage si l'API échoue
  const loadUserFromStorage = () => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        return parsedUser;
      }
    } catch (error) {
      console.error("Erreur lors du chargement depuis localStorage:", error);
      localStorage.removeItem("userData");
    }
    return null;
  };

  // Version améliorée de initAuth avec fallback sur localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userData = await apiService.getCurrentUser();
          
          console.log("Données utilisateur chargées depuis l'API:", userData);
          
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            // Sauvegarder pour la prochaine fois
            localStorage.setItem("userData", JSON.stringify(userData));
          } else {
            // Fallback sur localStorage si l'API ne retourne pas de données
            loadUserFromStorage();
          }
        } catch (error) {
          console.error("Échec du chargement utilisateur depuis l'API:", error);
          
          // Essayer de charger depuis localStorage comme fallback
          const userFromStorage = loadUserFromStorage();
          
          if (!userFromStorage) {
            // Si même le localStorage échoue, nettoyer tout
            localStorage.removeItem("authToken");
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};