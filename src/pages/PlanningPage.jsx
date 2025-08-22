import { useState } from "react";
import { Card } from "../components/common/Card";
import { Select } from "../components/common/Select";
import { MONTH_OPTIONS } from "../assets/constants/monthOptions";
import { YEAR_OPTIONS } from "../assets/constants/yearOptions";
import { isHoliday, getStatusColor, getStatusLabel } from "../utils/utils";

export const PlanningPage = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  monthDays,
  getDayStatus,
  setDayStatus,
}) => {
  // Fonction pour organiser les jours par semaine
  const organizeByWeeks = (days) => {
    const weeks = [];
    let currentWeek = [];

    days.forEach((day, index) => {
      // Si c'est un lundi et qu'on a déjà des jours dans la semaine courante, on commence une nouvelle semaine
      if (day.getDay() === 1 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [day];
      } else {
        currentWeek.push(day);
      }

      // Si c'est le dernier jour du mois, on ajoute la semaine courante
      if (index === days.length - 1) {
        weeks.push(currentWeek);
      }
    });

    return weeks;
  };

  const weeks = organizeByWeeks(monthDays);

  return (
    <div className="space-y-8">
      <Card title="🗓️ Sélection de la période">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="📅 Mois"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            options={MONTH_OPTIONS}
          />
          <Select
            label="🗓️ Année"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            options={YEAR_OPTIONS}
          />
        </div>
      </Card>

      <Card
        title={`📊 Planning ${MONTH_OPTIONS[selectedMonth].label} ${selectedYear}`}
      >
        <div className="space-y-4">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-4">
              {week.map((day) => {
                const status = getDayStatus(day);
                const holiday = isHoliday(day);
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                const canModify = !isWeekend && !holiday;

                return (
                  <div
                    key={day.toISOString()}
                    className={`p-4 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${getStatusColor(
                      status
                    )}`}
                  >
                    <div className="font-bold text-lg mb-2">
                      {day.getDate()}{" "}
                      {day.toLocaleDateString("fr-FR", { weekday: "short" })}
                    </div>

                    {holiday && (
                      <div className="text-xs text-red-600 mb-2 font-semibold">
                        🎉 {holiday}
                      </div>
                    )}

                    <div className="text-sm mb-3 font-medium">
                      {getStatusLabel(status)}
                    </div>

                    {canModify && (
                      <select
                        value={status}
                        onChange={(e) => setDayStatus(day, e.target.value)}
                        className="w-full text-xs p-2 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                      >
                        <option value="onsite">🏢 Sur site</option>
                        <option value="remote">🏠 Télétravail</option>
                        <option value="vacation">🏖️ Congés</option>
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
