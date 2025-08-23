// src/pages/WeeklySchedulePage.jsx
import { useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import { Card } from "../components/common/Card";
import { Toggle } from "../components/common/Toggle";
import { Button } from "../components/common/Button";

export const WeeklySchedulePage = () => {
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger le planning hebdomadaire
  useEffect(() => {
    const loadWeeklySchedule = async () => {
      try {
        const data = await apiService.getWeeklySchedule();
        setWeeklySchedule(data.schedule);
      } catch (err) {
        setError(
          "Erreur lors du chargement du planning hebdomadaire: " + err.message
        );
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWeeklySchedule();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await apiService.updateWeeklySchedule({ schedule: weeklySchedule });
      setSuccess("✅ Semaine-type sauvegardée avec succès !");

      // Faire disparaître le message de succès après 3 secondes
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erreur lors de la sauvegarde: " + err.message);
      console.error("Erreur:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDayToggle = (day, isOnsite) => {
    setWeeklySchedule({
      ...weeklySchedule,
      [day]: isOnsite,
    });
  };

  if (loading) {
    return (
      <Card title="⚙️ Configuration de la semaine-type">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Chargement du planning hebdomadaire...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="⚙️ Configuration de la semaine-type">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          {success}
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(weeklySchedule).map(([day, isOnsite]) => (
          <Toggle
            key={day}
            label={`${day.charAt(0).toUpperCase() + day.slice(1)} - ${
              isOnsite ? "🏢 Sur site" : "🏠 Télétravail"
            }`}
            checked={isOnsite}
            onChange={(checked) => handleDayToggle(day, checked)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button size="large" onClick={handleSave} disabled={saving}>
          {saving ? "🔄 Sauvegarde..." : "💾 Sauvegarder"}
        </Button>
      </div>
    </Card>
  );
};
