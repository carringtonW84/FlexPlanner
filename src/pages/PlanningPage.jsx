// src/pages/PlanningPage.jsx
import { useState, useEffect, useMemo } from "react";
import { apiService } from "../services/apiService";
import { Card } from "../components/common/Card";
import { Select } from "../components/common/Select";

export const PlanningPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthOptions, setMonthOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [planningData, setPlanningData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger les options de configuration
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [months, years] = await Promise.all([
          apiService.getMonths(),
          apiService.getYears(),
        ]);
        setMonthOptions(months);
        setYearOptions(years);
      } catch (err) {
        console.error("Erreur lors du chargement des options:", err);
      }
    };

    loadOptions();
  }, []);

  // Charger les données du planning
  useEffect(() => {
    const loadPlanning = async () => {
      if (!monthOptions.length || !yearOptions.length) return;

      setLoading(true);
      setError("");

      try {
        const data = await apiService.getMonthlyPlanning(
          selectedYear,
          selectedMonth + 1
        );
        setPlanningData(data);
      } catch (err) {
        setError("Erreur lors du chargement du planning: " + err.message);
        console.error("Erreur planning:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlanning();
  }, [selectedMonth, selectedYear, monthOptions.length, yearOptions.length]);

  // Organiser les jours par semaine
  const organizeByWeeks = (days) => {
    const weeks = [];
    let currentWeek = [];

    days.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      // Si c'est un lundi (1) et qu'on a déjà des jours dans la semaine courante
      if (dayOfWeek === 1 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [day];
      } else {
        currentWeek.push(day);
      }

      // Si c'est le dernier jour du mois
      if (index === days.length - 1) {
        weeks.push(currentWeek);
      }
    });

    return weeks;
  };

  const weeks = useMemo(() => organizeByWeeks(planningData), [planningData]);

  const handleDayStatusChange = async (day, newStatusCode) => {
    if (!day.canModify) return;

    try {
      await apiService.updateDayPlanning(day.date, newStatusCode);

      // Mettre à jour l'état local
      setPlanningData((prevData) =>
        prevData.map((d) =>
          d.date === day.date ? { ...d, statusCode: newStatusCode } : d
        )
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      alert("Erreur lors de la mise à jour du planning");
    }
  };

  const getStatusOptions = () => [
    { value: "ONSITE", label: "🏢 Sur site" },
    { value: "REMOTE", label: "🏠 Télétravail" },
    { value: "VACATION", label: "🏖️ Congés" },
  ];

  if (!monthOptions.length || !yearOptions.length) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Chargement des options...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card title="🗓️ Sélection de la période">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="📅 Mois"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            options={monthOptions}
          />
          <Select
            label="🗓️ Année"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            options={yearOptions}
          />
        </div>
      </Card>

      <Card
        title={`📊 Planning ${
          monthOptions.find((m) => m.value == selectedMonth)?.label || ""
        } ${selectedYear}`}
      >
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Chargement du planning...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-4">
                {week.map((day) => {
                  const date = new Date(day.date);
                  const dayNumber = date.getDate();
                  const dayName = date.toLocaleDateString("fr-FR", {
                    weekday: "short",
                  });

                  return (
                    <div
                      key={day.date}
                      className={`p-4 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                        day.statusColor ||
                        "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      <div className="font-bold text-lg mb-2">
                        {dayNumber} {dayName}
                      </div>

                      <div className="text-sm mb-3 font-medium">
                        {day.statusEmoji} {day.statusName}
                      </div>

                      {day.canModify && (
                        <select
                          value={day.statusCode}
                          onChange={(e) =>
                            handleDayStatusChange(day, e.target.value)
                          }
                          className="w-full text-xs p-2 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                        >
                          {getStatusOptions().map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {day.notes && (
                        <div className="text-xs text-gray-600 mt-2 italic">
                          📝 {day.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
