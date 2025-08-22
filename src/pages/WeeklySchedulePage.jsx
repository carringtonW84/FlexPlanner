import { useState } from "react";
import { Card } from "../components/common/Card";
import { Toggle } from "../components/common/Toggle";
import { Button } from "../components/common/Button";

export const WeeklySchedulePage = ({ weeklySchedule, setWeeklySchedule }) => {
  return (
    <Card title="⚙️ Configuration de la semaine-type">
      <div className="space-y-6">
        {Object.entries(weeklySchedule).map(([day, isOnsite]) => (
          <Toggle
            key={day}
            label={`${day.charAt(0).toUpperCase() + day.slice(1)} - ${
              isOnsite ? "🏢 Sur site" : "🏠 Télétravail"
            }`}
            checked={isOnsite}
            onChange={(checked) =>
              setWeeklySchedule({
                ...weeklySchedule,
                [day]: checked,
              })
            }
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          size="large"
          onClick={() => alert("✅ Semaine-type sauvegardée !")}
        >
          💾 Sauvegarder
        </Button>
      </div>
    </Card>
  );
};
