// src/App.jsx
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { AppHeader } from "./components/layout/AppHeader.jsx";
import { PlanningPage } from "./pages/PlanningPage.jsx";
import { NavigationBar } from "./components/layout/NavigationBar.jsx";
import { WeeklySchedulePage } from "./pages/WeeklySchedulePage.jsx";
import { VacationsPage } from "./pages/VacationsPage.jsx";
import { AccountPage } from "./pages/AccountPage.jsx";
import { PresencePage } from "./pages/PresencePage.jsx";
import { Card } from "./components/common/Card.jsx";
import { TeamReportsPage } from "./pages/TeamsReportPage.jsx";
import { OnCallSchedulePage } from "./pages/OnCallSchedulePage.jsx";

const AppContent = () => {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const [activeNavItem, setActiveNavItem] = useState("planning");

  // Suppression de l'élément "Mon compte" du menu de navigation
  const navItems = [
    { id: "planning", label: "📅 Mon planning" },
    { id: "weekly", label: "⏰ Ma semaine-type" },
    { id: "vacations", label: "🏖️ Mes congés" },
    { id: "presence", label: "👥 Qui est là ?" },
    { id: "oncall", label: "🚨 Astreintes" },
    { id: "reports", label: "📊 Rapports équipe" },
  ];

  // Fonction pour gérer le clic sur "Mon Compte" depuis l'en-tête
  const handleAccountClick = () => {
    setActiveNavItem("account");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderContent = () => {
  switch (activeNavItem) {
    case "planning":
      return <PlanningPage />;
    case "weekly":
      return <WeeklySchedulePage />;
    case "vacations":
      return <VacationsPage />;
    case "account":
      return <AccountPage />;
    case "presence":
      return <PresencePage />;
    case "oncall":
      return <OnCallSchedulePage />;
    case "reports":
      return <TeamReportsPage />; 
    default:
      return (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❓</div>
            <h2 className="text-2xl font-bold text-gray-600">
              Page non trouvée
            </h2>
          </div>
        </Card>
      );
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <AppHeader 
        user={user} 
        onAccountClick={handleAccountClick}
        onLogout={logout}
      />
      <NavigationBar
        items={navItems}
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
      />

      <main className="container mx-auto px-6 py-12">{renderContent()}</main>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="text-2xl">📅</span>
            <span className="font-bold text-lg">Flex Planner</span>
          </div>
          <p className="text-gray-300">
            &copy; 2025 - Flex Planner. Gérez votre planning en toute
            simplicité.
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;