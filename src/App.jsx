import { useState, useMemo } from "react";
import { getMonthDays, isHoliday, getDayOfWeekName } from "./utils/utils.js";
import { AppHeader } from "./components/layout/AppHeader.jsx";
import { PlanningPage } from "./pages/PlanningPage.jsx";
import { NavigationBar } from "./components/layout/NavigationBar.jsx";
import { WeeklySchedulePage } from "./pages/WeeklySchedulePage.jsx";
import { VacationsPage } from "./pages/VacationsPage.jsx";
import { AccountPage } from "./pages/AccountPage.jsx";
import { PresencePage } from "./pages/PresencePage.jsx";

const App = () => {
  const [activeNavItem, setActiveNavItem] = useState("planning");

  // Planning state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [userPlanning, setUserPlanning] = useState({});
  const [weeklySchedule, setWeeklySchedule] = useState({
    lundi: true,
    mardi: true,
    mercredi: false,
    jeudi: true,
    vendredi: false,
  });

  // Vacations state
  const [vacations, setVacations] = useState([
    {
      id: 1,
      startDate: "2025-03-15",
      endDate: "2025-03-25",
      type: "Congés payés",
    },
    {
      id: 2,
      startDate: "2025-07-10",
      endDate: "2025-07-20",
      type: "Congés été",
    },
  ]);

  // Team members state
  const [selectedTeam, setSelectedTeam] = useState("Équipe Développement");

  const navItems = [
    { id: "planning", label: "📅 Mon planning" },
    { id: "weekly", label: "⏰ Ma semaine-type" },
    { id: "vacations", label: "🏖️ Mes congés" },
    { id: "presence", label: "👥 Qui est là ?" },
    { id: "account", label: "👤 Mon compte" },
  ];

  const monthDays = useMemo(() => {
    return getMonthDays(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const getDayStatus = (date) => {
    const key = date.toISOString().split("T")[0];
    if (userPlanning[key]) return userPlanning[key];

    const holiday = isHoliday(date);
    if (holiday) return "holiday";

    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return "weekend";

    const dayName = getDayOfWeekName(dayOfWeek);
    if (weeklySchedule[dayName] !== undefined) {
      return weeklySchedule[dayName] ? "onsite" : "remote";
    }

    return "onsite";
  };

  const setDayStatus = (date, status) => {
    const key = date.toISOString().split("T")[0];
    setUserPlanning({
      ...userPlanning,
      [key]: status,
    });
  };

  const renderContent = () => {
    switch (activeNavItem) {
      case "planning":
        return (
          <PlanningPage
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            monthDays={monthDays}
            getDayStatus={getDayStatus}
            setDayStatus={setDayStatus}
          />
        );
      case "weekly":
        return (
          <WeeklySchedulePage
            weeklySchedule={weeklySchedule}
            setWeeklySchedule={setWeeklySchedule}
          />
        );
      case "vacations":
        return (
          <VacationsPage vacations={vacations} setVacations={setVacations} />
        );
      case "account":
        return <AccountPage />;
      case "presence":
        return (
          <PresencePage
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        );
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
      <AppHeader />
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
            <span className="font-bold text-lg">WorkFlow Manager</span>
          </div>
          <p className="text-gray-300">
            &copy; 2025 WorkFlow Manager. Gérez votre planning en toute
            simplicité.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
